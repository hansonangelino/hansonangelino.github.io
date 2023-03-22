/**
* Responsive
* 
* author: Thilo Ilg
* version: 1.1.6
* 
**/
var jAlbumSettings = (function (){
	window.$jAlbum = jQuery.noConflict(true); //change jQuery namespace since code gets embedded into other websites as well
})();

/** 
* --- jAlbumLibrary ---
* jAlbumLibrary contains useful functions for the skin
* which seem to general to put them into the jAlbumController.
* The library relies on jQuery in some of the functions.
*/
var jAlbumLibrary = (function (){

	/** returns string directory one folder back to the root folder **/
	function previousDir(path){
		var temp = path.substring(0, path.length - 1); // cut slash off
		return temp.substring(0, temp.lastIndexOf("/") + 1); // cut off last folder
	}

	/** returns string directory one given folder forward **/
	function nextDir(path, folder){
		return path + folder + "/";
	}

	/** truncates string at a given limit of characters **/
	function truncate(text, limit){
		return (text.length > limit) ? text.substring(0 , limit) + '...' : text;
	}

	/** creates an img element with given source and id **/
	function img(id, src){
		var img = $jAlbum("<img>");
		img.prop("id", id);
		img.prop("src", src);
		return img;
	}

	/** creates an video element with given source and id **/
	function vid(id, src){
		var vid = $jAlbum("<video>");
		vid.prop("id", id);
		vid.prop("src", src);
		return vid;
	}

	/** preloads an image by given path **/
	function preloadImg(src){
		var preloadImg = new Image();
		preloadImg.src = src;
	}

	/** changes hash value of url into given hash value **/
	function setHash(hashValue){
		window.location.hash = hashValue;
	}

	/** returns hash value of url **/
	function getHash(){
		return window.location.hash;
	}

	/** returns all the public variables and functions **/
	return {
		previousDir: previousDir,
		nextDir: nextDir,
		truncate: truncate,
		img: img,
		vid: vid,
		preloadImg: preloadImg,
		setHash: setHash,
		getHash: getHash
	}
})();

/** 
* --- jAlbumController ---
* jAlbumController is responsive for taking the album data and 
* updating it to the website content. 
*/
var jAlbumController = (function () {

	/** static parameter **/
	var IMG_BOX_PADDING = getImgBoxPadding(); // defines padding of container to the element
	var BOX_SIZE = getBoxSize(); // defines the size of the container around the elements 

	/** temporary storage variables **/

	var currentPath = ""; // current folder path
	var tempSlideIndex = null; // current slide for fullscreen view

	var thumbs = new Array(); // temporary storage of thumbnails
	var slides = new Array(); // temporary storage of slide informations
	var folders = new Array(); // temporary storage of folder informations

	/** jQuery Mobile settings **/
	$jAlbum.mobile.hashListeningEnabled = false; // prevent hash handling by jQuery Mobile

	$jAlbum(document).bind('mobileinit',function(){ // prevent hash handling for jQuery Mobile initialization
	    $jAlbum.mobile.changePage.defaults.changeHash = false;
	    $jAlbum.mobile.hashListeningEnabled = false;
	    $jAlbum.mobile.pushStateEnabled = false;
	});

	$jAlbum(document).ready( function() { // hide jQuery Mobile UI loader
	    $jAlbum(".ui-loader").hide();
	});

	/** skin inizialisation settings **/
	if(currentPath == "") $jAlbum(".leaveFolder").hide(); // hide the go back button if page loaded in root folder without hash directory

	if(!${jAlbumGlobals}.credits) $jAlbum('#jAlbum-footer .center').hide(); // hide credits in footer if disabled

	/** go back also on background click possible **/
	$jAlbum("#Responsive" + ${jAlbumGlobals}.uniqueId + ", .jAlbum #jAlbum-footer, .jAlbum #jAlbum-footer .center, .jAlbum #jAlbum-footer .left, .jAlbum #jAlbum-footer p, .jAlbum #jAlbum-content, .jAlbum #print").click(function(event) {
		if(event.target == event.currentTarget){
			back();
		}
	});

	/** helper functions to get and set different values **/
	function getWidth(){
		return $jAlbum("#Responsive" + ${jAlbumGlobals}.uniqueId).width();
	}

	function getHeight(){
		return $jAlbum(window).height();
	}

	function getMaxLetterParam(){
		return (${jAlbumGlobals}.imgBoxSize / 25) * 3 + (16 - ${jAlbumGlobals}.textSize) * 2 - 8;
	}

	function getImgBoxPadding(){
		return ${jAlbumGlobals}.mobile ? 15 : 25;
	}

	function getBoxSize(){
		return ${jAlbumGlobals}.mobile ? ${jAlbumGlobals}.imgBoxSize - 25 : ${jAlbumGlobals}.imgBoxSize;
	}

	function getNumImgsInRow(innerWidth){
	    var number = Math.round((innerWidth)/BOX_SIZE);
	    return (number < 1) ? 1 : (number > ${jAlbumGlobals}.maxImgInRow) ? ${jAlbumGlobals}.maxImgInRow : number;
	}

	function setHashPathAndSlide(currentSlide){
		var tempSlide = currentSlide == undefined ? "" : currentSlide;
		// clear the hash but only if online, else without since chrome doesnt handle offline pushState events
		if(currentPath == "" && ${jAlbumGlobals}.online) history.pushState('', document.title, window.location.pathname);
		jAlbumLibrary.setHash(currentPath + tempSlide);
	}

	function setImageBoxSize(size){
	    $jAlbum(".main-box").css({"width": size + "px", "height": size + "px"});
	    $jAlbum(".wrapper-box").css({"width": size + "px", "height": size + "px"});
	}

	/** preloading all slides in current folder **/
	function preloadCurrSlides(){
		for(var i = 0; i < slides.length; i++){
			preloadImage(${jAlbumGlobals}.jAlbumURL + currentPath + slides[i].path);
		}
	}

	/** preloading images before and after current image **/
	function preloadBeforeAndAfter(index, number){ // number desides how many images should be loaded in both directions

		var start = index - number < 0 ? 0 : index - number;
		var end = index + number > slides.length ? slides.length : index + number;

		for(var i = start; i < end; i++){
			if (slides[i].category == 'image') {
				jAlbumLibrary.preloadImg(${jAlbumGlobals}.jAlbumURL + currentPath + slides[i].path);
			}
		}
	}

	/** change size of image container and images by resize **/
	window.onresize = function(){

		arrange();
		arrangeFullscreen();

	};

	/** set current paths on directory back **/
	function back(){

		if(currentPath !== ""){

			currentPath = jAlbumLibrary.previousDir(currentPath);

			var newObject = getAlbumData(currentPath);

			clearUpContent();
			setHashPathAndSlide();
			initContent(newObject);
			arrange();
		}
	}

	/** trigger function to trigger delete event **/
	function triggerClearUp(state) {

	    var evt = $jAlbum.Event('clearUpContent');

	    $jAlbum(window).trigger(evt);
	}

	/** clears up content and empties arrays, etc **/
	function clearUpContent(){

		triggerClearUp();

		folders = new Array();
		slides = new Array();
		thumbs = new Array();

		// hide leave folder in root folder of album
		if(currentPath == ""){
			$jAlbum(".leaveFolder").hide();
		} else {
			$jAlbum(".leaveFolder").show();
		}
	}

	function getAlbumData(path){
		var obj = ${jAlbumGlobals}.dataTree; // jAlbum dataTree
		return getAlbumDataHelper(obj , path); // call recursive helper function
	}

	/** recursively getting the current json object **/
	function getAlbumDataHelper(obj, path){

		var firstDir = path.substring(0, path.indexOf("/"));
		var newPath = path.substring(path.indexOf("/") + 1, path.length);
		
		if(firstDir == ""){
			return obj;
		} else {
			for(var i = 0; i < obj.objects.length; i++){
	    		if(obj.objects[i].category == 'folder' && obj.objects[i].path == firstDir){
	    			var newObj = obj.objects[i];
	    			break;
	   			}
			}
	    	return getAlbumDataHelper(newObj, newPath);
		}
	}

	/** check index **/
	function getIndexOfElem(jsonTemp, elem){

		var index = 0;

		for(var i = 0; i < jsonTemp.objects.length; i++){
			switch(jsonTemp.objects[i].category){
			    case 'video':
			    case 'image':
			    	if(jsonTemp.objects[i].name == elem) return index;
			  		else index ++
			}
		}
		return -1;
	}

  	/** jumps to current hash position if link includes hash which points on a specific image or video **/
	function init(){
		
		// split hash off
		var hash = jAlbumLibrary.getHash().substr(1);

		// get directory and current element
		var dir = hash.substr(0, hash.lastIndexOf("/") + 1);
		var elem = hash.substr(hash.lastIndexOf("/") + 1);

		currentPath = dir;

		var currJson = getAlbumData(dir);
		var currIndex = getIndexOfElem(currJson, elem);

		initContent(currJson);

		if(currIndex != -1) fullscreen(currIndex);
		if(currentPath != "") $jAlbum(".leaveFolder").show();
	}

	/**  initializes all the container **/
	function initContent(jsonTemp) {

		var folderIndex = 0;

	    $jAlbum.each(jsonTemp.objects, function (index, object) {
	    	switch (object.category) {

			    case 'folder':
			    	// ignore empy folders
			    	if(!object.objects) break;

			    	folders[folderIndex] = {
						index: folderIndex,
						name: object.name,
						path: object.thumb.path,
						width: object.thumb.width,
						height: object.thumb.height,
						count: object.deepCounters.total
					};

					initFolder(folderIndex, object);

			    	folderIndex++;
			        break;
		    }

	    });

	    var imageIndex = 0;

	    $jAlbum.each(jsonTemp.objects, function (index, object) {
	    	switch (object.category) {

			    case 'image':
			    
	    		    thumbs[imageIndex] = {
						index: imageIndex,
						path: object.thumb.path,
						width: object.thumb.width,
						height: object.thumb.height
					};

					slides[imageIndex] = {
						index: imageIndex,
						name: object.name,
						category: object.category,
						path: object.image.path,
						width: object.image.width,
						height: object.image.height,
						description: object.comment
					};

					initImage(imageIndex, object);
	        		imageIndex++;
			        break;

			    case 'video':
			    
	    		    thumbs[imageIndex] = {
						index: imageIndex,
						path: object.thumb.path,
						width: object.thumb.width,
						height: object.thumb.height
					};

					slides[imageIndex] = {
						index: imageIndex,
						name: object.name,
						category: object.category,
						path: object.original.path,
						videothumb: object.image.path,
						width: object.image.width,
						height: object.image.height,
						description: object.comment
					};

					initImage(imageIndex, object);
	        		imageIndex++;
			        break;
		    }

	    });

	    // second call because if scoll bar appears it needs to calculate again
		arrange();
	}

	/** arranging container in content div **/
	function arrange() {

		var embedWidth, embedHeight, topBottomPadding, minHeight, innerWidth, imgBoxSize, imgSize, num;

		for(var i = 0; i < 2; i++){
			embedWidth = getWidth();
			embedHeight = getHeight();

			topBottomPadding = embedWidth * 0.025;
			minHeight = embedHeight - (topBottomPadding * 2); 

			$jAlbum("#Responsive" + ${jAlbumGlobals}.uniqueId + " #jAlbum-content").css("padding", '' + topBottomPadding + 'px 2.5%');

			// real calculation
			innerWidth = embedWidth - embedWidth * 0.05 - 0.5;

			num = getNumImgsInRow(innerWidth);

			imgBoxSize = innerWidth/num;
			imgSize = imgBoxSize - IMG_BOX_PADDING;

			setImageBoxSize(imgBoxSize);
		}	

		// center video icon in the middle
		$jAlbum(".video_icon").css("padding", (imgBoxSize - 50)/2);

		arrangeFolders(imgBoxSize, imgSize);
		arrangeImages(imgBoxSize, imgSize);
	}

	/**  initializes all the folder container **/
	function initFolder(index, json){

		// main includes img and text contaienr
		var coverBox = $jAlbum("<div>", {class: "main-box"});
		var mainBox = $jAlbum("<div>", {class: "wrapper-box"});
		var textBox = $jAlbum("<div>", {class: "text-box"});

		// temporary variable to count number of thumbnails of a folder
		var numOfImg = 0;

		// function gets called by entering folder
		function goForward(){
			currentPath = jAlbumLibrary.nextDir(currentPath, json.path);
			clearUpContent();
			setHashPathAndSlide();
			initContent(json);
	    }

	    // add main index special id for size calculation
	    mainBox.attr("id", "test-box-" + index);

	    // hover settings for main box
	    mainBox.css({
	    	"-webkit-transition": "0.2s ease-out",
	    	"-moz-transition": "0.2s ease-out",
	    	"-o-transition": "0.2s ease-out",
	    	"transition": "0.2s ease-out",
	    });

	    // click handler on main box
		mainBox.click( function(event) {
			event.stopPropagation();
			(event.target == event.currentTarget ? back : goForward)();
		});

		// interate through images in folder directory and collect maximal three as thumbnails
		$jAlbum.each(json.objects, function (i, object) {

			if(numOfImg < 3){ // 0 is the first one
				switch (object.category) {

					// check if image
					case 'image':

						// path to current image
						var imgPath = currentPath + json.path + "/" + object.thumb.path;

						// get div container with special given image folder id 
						var img = jAlbumLibrary.img("img-folder-" + numOfImg + "-" + index, ${jAlbumGlobals}.jAlbumURL + imgPath);

						// add classes to folder thumbnail images to inject with certain behavior
						img.addClass("shadow");
						img.addClass("imgRadius");

						// fade in class
						img.addClass("fadein-" + (numOfImg + 1));

						img.prop("title", jAlbumLibrary.truncate(folders[index].name, 50)); // truncate title of folder

					    // clear up trigger event
						$jAlbum(window).on('clearUpContent', function (event) {
							img.remove();
						});

						// regulate hover event on folders with given scale factor
						if(!${jAlbumGlobals}.mobile){
						    img.hover(function(){
						    	mainBox.css({
						    		"-webkit-transform": ${jAlbumGlobals}.imgHoverScaleFactor,
							    	"-moz-transform": ${jAlbumGlobals}.imgHoverScaleFactor,
							    	"-o-transform": ${jAlbumGlobals}.imgHoverScaleFactor,
							    	"transform": ${jAlbumGlobals}.imgHoverScaleFactor
						    	});
							}, function(){
								mainBox.css({
									"-webkit-transform": "scale(1)",
							    	"-moz-transform": "scale(1)",
							    	"-o-transform": "scale(1)",
							    	"transform": "scale(1)"
								});
							});
						}

						// append image to main container
					    mainBox.append(img);
					    numOfImg++;

			       		break;
				}
			}
	    });

		// add empty folder thumbnail if no images found
		if(numOfImg == 0){

			var img = $jAlbum("<img>");

			// empty folder thumbnail path
		    img.attr("src", ${jAlbumGlobals}.jAlbumURL + "res/img/folder.png");
		    img.css("position", "absolute");

			// add style
			if(${jAlbumGlobals}.showFolderName){
				img.css("width", "60%");
				img.css("margin", "20%");
			}else{
				img.css("width", "80%");
				img.css("margin", "10%");
			}

			img.prop("title", jAlbumLibrary.truncate(folders[index].name, 50)); // give the folder a hover hint with the name of it

			// add classes to folder thumbnail images to inject with certain behavior
			img.addClass("emptyFolderThumbnail");

			// add fade in
			img.addClass("fadein-1");

		    // clear up trigger event
			$jAlbum(window).on('clearUpContent', function (event) {
				img.remove();
			});

			// regulate hover event on folders with given scale factor
			if(!${jAlbumGlobals}.mobile){
			    img.hover(function(){
			    	mainBox.css({
			    		"-webkit-transform": ${jAlbumGlobals}.imgHoverScaleFactor,
				    	"-moz-transform": ${jAlbumGlobals}.imgHoverScaleFactor,
				    	"-o-transform": ${jAlbumGlobals}.imgHoverScaleFactor,
				    	"transform": ${jAlbumGlobals}.imgHoverScaleFactor
			    	});
				}, function(){
					mainBox.css({
						"-webkit-transform": "scale(1)",
				    	"-moz-transform": "scale(1)",
				    	"-o-transform": "scale(1)",
				    	"transform": "scale(1)"
					});
				});
			}

			// append image to main container
			mainBox.append(img);
		}

		// add fodler name in main box
		if(${jAlbumGlobals}.showFolderName){
			textBox.addClass("folderTitle");

			var maxLetters = getMaxLetterParam();

			var numOfImages = folders[index].count ? folders[index].count : 0; // initialize and check if undefined set to zero

			if(${jAlbumGlobals}.folderImgCount){
				textBox.append("<p>" + jAlbumLibrary.truncate(folders[index].name, maxLetters) + " (" + numOfImages + ")</p>");
			} else {
				textBox.append("<p>" + jAlbumLibrary.truncate(folders[index].name, maxLetters + 3) + "</p>");
			}

		    textBox.click( function(event) {
				event.stopPropagation();
				if(event.target == event.currentTarget){
					goForward();
				}
			});

			coverBox.append(textBox);
			
		}
		
		coverBox.append(mainBox);

		// add image folder box to page content
	    $jAlbum("#Responsive" + ${jAlbumGlobals}.uniqueId + " #jAlbum-content").append(coverBox);

	    // clear up trigger event
		$jAlbum(window).on('clearUpContent', function (event) {
			event.stopPropagation();
		    coverBox.remove();
		});
	}

	/** arranges images depending on inner window size **/
	function arrangeFolders(mainBoxSize, imgSize){

		// set folder name padding
		if(${jAlbumGlobals}.folderTitleUp){
			$jAlbum(".text-box").css("padding-top", "3px");
			$jAlbum(".text-box").css("padding-left", "5px");
		} else {
			$jAlbum(".text-box").css("padding-top", (mainBoxSize - 43) + "px");
			$jAlbum(".text-box").css("padding-left", "5px");
		}

		imgSize = ${jAlbumGlobals}.showFolderName ? imgSize * 0.5 : imgSize * 0.8;

		$jAlbum.each(folders, function(index, folder) {

			if(folder.width != undefined){

				// temporary parameters
				var width = folder.width;
				var height = folder.height;

				for(var i = 0; i < 3; i++){

					var img = $jAlbum("#Responsive" + ${jAlbumGlobals}.uniqueId + " #img-folder-" + i + "-" + folder.index);
					var x = (i - 1) * - 10;
					var y = (i - 1) * - 10;
					var scaledWidth = 0;
					var scaledHeight = 0;

					img.css("transform", "translate(" + x + "px," + y + "px)");
					img.css("zIndex",  20 - i);

					// scales image to certain size
					if(width >= height){
						scaledWidth = imgSize;
						scaledHeight = height / (width/imgSize);
					} else {
						scaledWidth = width / (height/imgSize);
						scaledHeight = imgSize;
					}

					img.css("width", scaledWidth + "px");				
					img.css("height", scaledHeight + "px");

					img.css("margin", ((mainBoxSize - scaledHeight)/2 - ${jAlbumGlobals}.imgBorderSize) + "px " + ((mainBoxSize - scaledWidth)/2 - ${jAlbumGlobals}.imgBorderSize) + "px");
				}
			}
		}); 
	}

	/** description: initializes all the image container **/
	function initImage(index, object){

		// get main div container
	    var box = $jAlbum("<div>", {class: "main-box"});

	    var img = jAlbumLibrary.img("img-thumb-" + index, ${jAlbumGlobals}.jAlbumURL + currentPath + object.thumb.path);

	    var video_icon_wrapper = $jAlbum("<div>", {class: "video_icon_wrapper"});

	    if(object.category == 'video'){
	    	var video_icon = $jAlbum("<img>", {class: "video_icon"});
	    	video_icon.addClass("fadein-1");
		    video_icon.attr("src", ${jAlbumGlobals}.jAlbumURL + "res/img/play.png");
		    video_icon_wrapper.append(video_icon);
	    }

	    img.css({
	    	"-webkit-transition": "0.2s ease-out",
	    	"-moz-transition": "0.2s ease-out",
	    	"-o-transition": "0.2s ease-out",
	    	"transition": "0.2s ease-out"
	    });

		img.css("zIndex", 5);

		img.addClass("shadow");
		img.addClass("imgRadius");
		img.addClass("img-box");
		img.addClass("fadein-1");

		var comment = slides[index].description == undefined ? "" : slides[index].description;

		img.prop("title", jAlbumLibrary.truncate(comment, 100)); // give an image a hover hint with the comment of it

		// hover treatment
		if(!${jAlbumGlobals}.mobile){
		    img.hover(function(){
		    	img.css("zIndex", 10);
				img.css({
					'-webkit-transform': ${jAlbumGlobals}.imgHoverScaleFactor,
					'-moz-transform': ${jAlbumGlobals}.imgHoverScaleFactor,
					'-o-transform': ${jAlbumGlobals}.imgHoverScaleFactor,
					'transform': ${jAlbumGlobals}.imgHoverScaleFactor
				});
			}, function(){

				img.css("zIndex", 5);
				img.css({
					'-webkit-transform': 'scale(1)',
					'-moz-transform': 'scale(1)',
					'-o-transform': 'scale(1)',
					'transform': 'scale(1)'
				});
			});
		}

		box.click( function(event) {
			// prevent page scroll
			event.stopPropagation();

	    	if(event.target == event.currentTarget){
				back();
			} else {
				fullscreen(index);
			}	
		});

	    box.append(img);
	    if(object.category == 'video')box.append(video_icon_wrapper);

	    $jAlbum("#Responsive" + ${jAlbumGlobals}.uniqueId + " #jAlbum-content").append(box);

	    // clear up trigger event
		$jAlbum(window).on('clearUpContent', function (event) {
		    box.remove();
		});

	}

	/** description: arranges images depending on inner window size plus scroll bar position **/
	function arrangeImages(imgBoxSize, imgSize) {

		$jAlbum.each(thumbs, function(index, thumb) {

			// temporary parameters
			var width = thumb.width;
			var height = thumb.height;
			
	    	var scaledWidth = 0;
	    	var scaledHeight = 0;

	    	var img = $jAlbum("#Responsive" + ${jAlbumGlobals}.uniqueId + " #img-thumb-" + thumb.index);
	    	var video_icon_wrapper = $jAlbum(".video_icon_wrapper");

	    	// scales image to certain size
	    	if(width >= height){
				scaledWidth = imgSize;
				scaledHeight = imgSize * height / width;
			} else {
				scaledWidth = imgSize * width / height;
				scaledHeight = imgSize;
			}

			img.css("width", scaledWidth + "px");
			img.css("height", scaledHeight + "px");
			video_icon_wrapper.css("width", imgBoxSize + "px");
			video_icon_wrapper.css("height", imgBoxSize + "px");

			// image margin (center image)
			img.css("margin", ((imgBoxSize - scaledHeight)/2 - ${jAlbumGlobals}.imgBorderSize) + "px " + ((imgBoxSize - scaledWidth)/2 - ${jAlbumGlobals}.imgBorderSize) + "px");

		}); 
	}

	/** description: shows image in fullsreen mode **/
	function fullscreen(index){

		setHashPathAndSlide(slides[index].name);

		var width = slides[index].width;
		var height = slides[index].height;
		var path = currentPath + slides[index].path;

	    var innerWidth = $jAlbum(window).width();
		var innerHeight = $jAlbum(window).height();

		var img;

	    var fs_box = $jAlbum("<div/>");
	    var cancel = $jAlbum("<div/>");
	    var play = $jAlbum("<div/>");
	    var thumbnail = slides[index].category == 'video' ? $jAlbum("<img src='" + ${jAlbumGlobals}.jAlbumURL + currentPath + slides[index].videothumb + "'>") : $jAlbum('<img>');
	    var description = $jAlbum("<div/>");

	    // hide description if disabled
	    if(!${jAlbumGlobals}.showComments) description.hide();

	    thumbnail.css({"width": "100%", "height": "100%", "position": "absolute"});

	    if(!${jAlbumGlobals}.mobile) thumbnail.css("opacity", "0");

	    description.unbind();

	    // handle navigation
		var fs = $jAlbum("#fullscreen");
		var em = $jAlbum("#Responsive" + ${jAlbumGlobals}.uniqueId)

		tempSlideIndex = index;

		em.css({"overflowY": "hidden", "height": "100%"});
	    fs.css("display", "block");

		fs_box.addClass("fs_box");
		cancel.addClass("cancel");
		play.addClass("play");
		thumbnail.addClass("video_thumbnail");
		description.addClass("fs_desc");


		if(slides[index].description != undefined){
			description.append("<p>" + slides[index].description + "</p>");
		}

		switch (slides[index].category) {
			case 'image':
				img = jAlbumLibrary.img("img-fullscreen-" + index, ${jAlbumGlobals}.jAlbumURL + path);
				play.hide();
				break;
			case 'video':
				img = jAlbumLibrary.vid("img-fullscreen-" + index, ${jAlbumGlobals}.jAlbumURL + path);
				play.show();
				break;
		}

		if(slides[index].category == 'video'){

			// autoplay videos if not mobile device
			//if(!window.mobile) img.attr("autoplay","");

			// show play button when video ends again for replay
		    img.on('ended',function(){
		      	play.show();
		      	thumbnail.show();
		    });
		}

		fs.click( function(event) {
			// prevent page scroll up
			event.stopPropagation();
	    	if(event.target == event.currentTarget){
				goBack();
			}
		});

		cancel.click( function(event) {
			// prevent page scroll up
			event.stopPropagation();
	    	if(event.target == event.currentTarget){
				goBack();
			}
		});

		play.click( function(event) {
			// prevent page scroll up
			event.stopPropagation();
	    	if(event.target == event.currentTarget){
				document.getElementById("img-fullscreen-" + index).play();
				play.hide();
				thumbnail.hide();
			}
		});

		fs.swipe({
			swipe:function(event, target) {
				// disable scrolling on mobile device
	        }
	    });

	    fs_box.swipe({
			tap:function(event, target) {
				if(event.target == event.currentTarget){
					if(slides[index].category == 'video' && !img.get(0).paused){
						img.get(0).pause();
						play.show();
	      				thumbnail.show();
					} else {
						goLeft();
					}
				}
	        },
	        longTap:function(event, target) {
	        	if(event.target == event.currentTarget){
	          		goBack();
	          	}
	        },
		    swipe:function(event, direction, distance, duration, fingerCount, fingerData) {

		    	switch(direction) {
				    case 'left':
			        	if(event.target == event.currentTarget){
			          		goLeft();
			          	}
				        break;
				    case 'right':
				        if(event.target == event.currentTarget){
			          		goRight();
			          	}
				        break;
				    case 'up':
				       	if(event.target == event.currentTarget){
			          		goBack();
			          	}
				    case 'down':
			        	if(event.target == event.currentTarget){
			          		goBack();
			          	}
				        break;
				    default:
				        break;
				}
		    }
		});

		$jAlbum(document).off().keyup(function (event){

			if(event.keyCode == 39){
				goLeft();
			}else if(event.keyCode == 37){
				goRight();
			}else if(event.keyCode == 27){
				goBack();
			}
		});

		function goLeft(){
		    var numOfObj = slides.length;
			var newIndex = index + 1;

			if(newIndex < 0){
				newIndex = newIndex + numOfObj;
			} else if(newIndex >= numOfObj){
				newIndex = newIndex - numOfObj;
			}	

			fs_box.remove();
		    img.remove();
		    thumbnail.remove();
		    fs.css("display", "none");
		    em.css({"overflowY": "visible", "height": "auto"});
		    
		    tempSlideIndex = null;

			fullscreen(newIndex);
		}

		function goRight(){
			var numOfObj = slides.length;
			var newIndex = index - 1;	

			if(newIndex < 0){
				newIndex = newIndex + numOfObj;
			} else if(newIndex >= numOfObj){
				newIndex = newIndex - numOfObj;
			}

			fs_box.remove();
		    img.remove();
		    thumbnail.remove();
			fs.css("display", "none");
		    em.css({"overflowY": "visible", "height": "auto"});

		    tempSlideIndex = null;
			fullscreen(newIndex);
		}

		function goBack(){
			fs.css("display", "none");
		    em.css({"overflowY": "visible", "height": "auto"});

		    fs_box.remove();
		    img.remove();
		    thumbnail.remove();
		    tempSlideIndex = null;

		    setHashPathAndSlide();

			arrange(); 
		}

		fs_box.append(cancel);
		fs_box.append(play);
		fs_box.append(description);
		fs.append(thumbnail);
		fs.append(fs_box);
	    fs.append(img);

	    arrangeFullscreen();

	    // preload images before and after
	    preloadBeforeAndAfter(index, 2);

	}


	/** description: fullscreen resize rearrange **/
	function arrangeFullscreen(){

		if(tempSlideIndex !== null){

			var width = slides[tempSlideIndex].width;
			var height = slides[tempSlideIndex].height;

			var innerWidth = $jAlbum(window).width();
			var innerHeight = $jAlbum(window).height();

			var imageBoxWidth = innerWidth - ${jAlbumGlobals}.slideMarginSize * 2 * innerWidth / 100;
			var imageBoxHeight = innerHeight - ${jAlbumGlobals}.slideMarginSize * 2 * innerHeight / 100;

			var scaledWidth = 0;
			var scaledHeight = 0;

			
			// handle image
			var img = $jAlbum("#fullscreen img, #fullscreen video, #fullscreen .fs_box, #fullscreen .video_thumbnail");

		    // scales image to certain size
			if(innerWidth/innerHeight >= width/height){
				scaledWidth = width / (height/(imageBoxHeight));
				scaledHeight = imageBoxHeight;
			} else {
				scaledWidth = imageBoxWidth;
				scaledHeight = height / (width/(imageBoxWidth));
			}

			img.css("margin", ((innerHeight) - scaledHeight)/2 + "px " + ((innerWidth) - scaledWidth)/2 + "px");
			img.css("height", scaledHeight);
			img.css("width", scaledWidth);

			// Rounding errors can occur if not using floor and -1.
			var center_margin = Math.floor((scaledWidth - $jAlbum(".fs_desc").width() - 1)/2);

			center_margin = center_margin < 0 ? 0 : center_margin; 

			$jAlbum(".fs_desc").css("margin", "0px " + center_margin + "px");
		}
	}

	/** returns all the public variables and functions **/
  	return {
  		init: init,
		back: back
  	};

})();

// call main
jAlbumController.init();