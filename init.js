/**
* Responsive
* 
* author: Thilo Ilg
* version: 1.1.6
* 
**/

/** 
* --- jAlbumGlobals ---
* jAlbumGlobals is responsible for constant parameter of the skin.
* In the process of creating an album the jAlbum parser will overwrite 
* the variables according to the skin with the selected ones in the
* program. jAlbumGlobals also includes global variables which describe
* the state of the skin like if it is embedded, viewed on a mobile device,
* online or in filesystem etc.
*/
var jAlbumGlobals1679471386669 = (function () {

	var styles = ["dark.css", "light.css", "transparent.css"]; // styles

	var mobile = isMobile(); // is the skin viewed on a mobile device
	var online = isOnline(); // is the skin viewed online or in the filesystem
	var jAlbumURL = getURL(); // what's the current url?

	var stylePath = ""; //path points to the styles folder
	var resPath = ""; // path points to the res folder

	var credits = "jAlbum web gallery software"; // should skin show credits in footer
	var albumTitle = "album"; // what's the album title?
	var contentPath = ""; // path points to the skin folder
	var imgHoverScaleFactor = "scale(1.1)"; // scale factor of hovering an element

	var folderTitleUp = true; // positioning of folder title, under or above folder
	var folderImgCount = false; // says if folder deep count should be shown
	var maxImgInRow = 15; // restricts the number of elements in a row
	var imgBorderSize = 1; // define border size of element
	var imgBoxSize = 175; // defines size of container of element
	var showFolderName = true; // says if folder name should be displayed
	var textSize = 16; // defines text size of whole page
	var showComments = true; // defines if comments should be shown in slideshow
	var slideBorderSize = 0;
	var slideBorderColor = "#ffffffff";
	var slideMarginSize = 0; // Margin around full screen image.
	var style = "dark.css";

	var dataTree = {"path":"album","counters":{"total":24,"images":24,"files":24},"thumb":{"path":"thumbs\/NGM2001_02p112.jpg","width":256,"height":192},"objects":[{"path":"NGM2001_02p112.jpg","image":{"path":"slides\/NGM2001_02p112.jpg","width":1024,"height":768},"thumb":{"path":"thumbs\/NGM2001_02p112.jpg","width":256,"height":192},"fileSize":231364,"name":"NGM2001_02p112.jpg","fileDate":"2005-11-14T17:35:02.0Z","category":"image","camera":{"originalDate":"2005-11-14T17:35:02.0Z"}},{"path":"NGM2001_02p116-7.jpg","image":{"path":"slides\/NGM2001_02p116-7.jpg","width":1024,"height":768},"thumb":{"path":"thumbs\/NGM2001_02p116-7.jpg","width":256,"height":192},"fileSize":141818,"name":"NGM2001_02p116-7.jpg","fileDate":"2005-11-14T17:35:04.0Z","category":"image","camera":{"originalDate":"2005-11-14T17:35:04.0Z"}},{"path":"NGM2001_03p16.jpg","image":{"path":"slides\/NGM2001_03p16.jpg","width":1024,"height":768},"thumb":{"path":"thumbs\/NGM2001_03p16.jpg","width":256,"height":192},"fileSize":184870,"name":"NGM2001_03p16.jpg","fileDate":"2005-11-14T17:35:04.0Z","category":"image","camera":{"originalDate":"2005-11-14T17:35:04.0Z"}},{"path":"NGM2001_03p33-5.jpg","image":{"path":"slides\/NGM2001_03p33-5.jpg","width":1024,"height":768},"thumb":{"path":"thumbs\/NGM2001_03p33-5.jpg","width":256,"height":192},"fileSize":214977,"name":"NGM2001_03p33-5.jpg","fileDate":"2005-11-14T17:35:04.0Z","category":"image","camera":{"originalDate":"2005-11-14T17:35:04.0Z"}},{"path":"NGM2001_03p42-3.jpg","image":{"path":"slides\/NGM2001_03p42-3.jpg","width":1024,"height":768},"thumb":{"path":"thumbs\/NGM2001_03p42-3.jpg","width":256,"height":192},"fileSize":90787,"name":"NGM2001_03p42-3.jpg","fileDate":"2005-11-14T17:35:06.0Z","category":"image","camera":{"originalDate":"2005-11-14T17:35:06.0Z"}},{"path":"NGM2001_04p102-3.jpg","image":{"path":"slides\/NGM2001_04p102-3.jpg","width":1024,"height":768},"thumb":{"path":"thumbs\/NGM2001_04p102-3.jpg","width":256,"height":192},"fileSize":215132,"name":"NGM2001_04p102-3.jpg","fileDate":"2005-11-14T17:35:06.0Z","category":"image","camera":{"originalDate":"2005-11-14T17:35:06.0Z"}},{"path":"NGM2001_03p40.jpg","image":{"path":"slides\/NGM2001_03p40.jpg","width":1024,"height":768},"thumb":{"path":"thumbs\/NGM2001_03p40.jpg","width":256,"height":192},"fileSize":70463,"name":"NGM2001_03p40.jpg","fileDate":"2005-11-14T17:35:06.0Z","category":"image","camera":{"originalDate":"2005-11-14T17:35:06.0Z"}},{"path":"NGM2001_04p108-9.jpg","image":{"path":"slides\/NGM2001_04p108-9.jpg","width":1024,"height":768},"thumb":{"path":"thumbs\/NGM2001_04p108-9.jpg","width":256,"height":192},"fileSize":389464,"name":"NGM2001_04p108-9.jpg","fileDate":"2005-11-14T17:35:08.0Z","category":"image","camera":{"originalDate":"2005-11-14T17:35:08.0Z"}},{"path":"NGM2001_04p116-7.jpg","image":{"path":"slides\/NGM2001_04p116-7.jpg","width":1024,"height":768},"thumb":{"path":"thumbs\/NGM2001_04p116-7.jpg","width":256,"height":192},"fileSize":203477,"name":"NGM2001_04p116-7.jpg","fileDate":"2005-11-14T17:35:08.0Z","category":"image","camera":{"originalDate":"2005-11-14T17:35:08.0Z"}},{"path":"NGM2001_04p118-9.jpg","image":{"path":"slides\/NGM2001_04p118-9.jpg","width":1024,"height":768},"thumb":{"path":"thumbs\/NGM2001_04p118-9.jpg","width":256,"height":192},"fileSize":139270,"name":"NGM2001_04p118-9.jpg","fileDate":"2005-11-14T17:35:10.0Z","category":"image","camera":{"originalDate":"2005-11-14T17:35:10.0Z"}},{"path":"NGM2001_04p119.jpg","image":{"path":"slides\/NGM2001_04p119.jpg","width":1024,"height":768},"thumb":{"path":"thumbs\/NGM2001_04p119.jpg","width":256,"height":192},"fileSize":169183,"name":"NGM2001_04p119.jpg","fileDate":"2005-11-14T17:35:10.0Z","category":"image","camera":{"originalDate":"2005-11-14T17:35:10.0Z"}},{"path":"NGM2001_04TVLoLe.jpg","image":{"path":"slides\/NGM2001_04TVLoLe.jpg","width":1024,"height":768},"thumb":{"path":"thumbs\/NGM2001_04TVLoLe.jpg","width":256,"height":192},"fileSize":221517,"name":"NGM2001_04TVLoLe.jpg","fileDate":"2005-11-14T17:35:10.0Z","category":"image","camera":{"originalDate":"2005-11-14T17:35:10.0Z"}},{"path":"NGM2001_07p98-9.jpg","image":{"path":"slides\/NGM2001_07p98-9.jpg","width":1024,"height":768},"thumb":{"path":"thumbs\/NGM2001_07p98-9.jpg","width":256,"height":192},"fileSize":194887,"name":"NGM2001_07p98-9.jpg","fileDate":"2005-11-14T17:35:12.0Z","category":"image","camera":{"originalDate":"2005-11-14T17:35:12.0Z"}},{"path":"NGM2001_07p104-5.jpg","image":{"path":"slides\/NGM2001_07p104-5.jpg","width":1024,"height":768},"thumb":{"path":"thumbs\/NGM2001_07p104-5.jpg","width":256,"height":192},"fileSize":153926,"name":"NGM2001_07p104-5.jpg","fileDate":"2005-11-14T17:35:12.0Z","category":"image","camera":{"originalDate":"2005-11-14T17:35:12.0Z"}},{"path":"NGM2001_07p106-7.jpg","image":{"path":"slides\/NGM2001_07p106-7.jpg","width":1024,"height":768},"thumb":{"path":"thumbs\/NGM2001_07p106-7.jpg","width":256,"height":192},"fileSize":193382,"name":"NGM2001_07p106-7.jpg","fileDate":"2005-11-14T17:35:12.0Z","category":"image","camera":{"originalDate":"2005-11-14T17:35:12.0Z"}},{"path":"NGM2001_08p74-5.jpg","image":{"path":"slides\/NGM2001_08p74-5.jpg","width":1024,"height":768},"thumb":{"path":"thumbs\/NGM2001_08p74-5.jpg","width":256,"height":192},"fileSize":107855,"name":"NGM2001_08p74-5.jpg","fileDate":"2005-11-14T17:35:14.0Z","category":"image","camera":{"originalDate":"2005-11-14T17:35:14.0Z"}},{"path":"NGM2001_08p80.jpg","image":{"path":"slides\/NGM2001_08p80.jpg","width":1024,"height":768},"thumb":{"path":"thumbs\/NGM2001_08p80.jpg","width":256,"height":192},"fileSize":119655,"name":"NGM2001_08p80.jpg","fileDate":"2005-11-14T17:35:14.0Z","category":"image","camera":{"originalDate":"2005-11-14T17:35:14.0Z"}},{"path":"NGM2001_08p100-1.jpg","image":{"path":"slides\/NGM2001_08p100-1.jpg","width":1024,"height":768},"thumb":{"path":"thumbs\/NGM2001_08p100-1.jpg","width":256,"height":192},"fileSize":154867,"name":"NGM2001_08p100-1.jpg","rating":4,"fileDate":"2005-11-14T17:35:14.0Z","category":"image","camera":{"originalDate":"2005-11-14T17:35:14.0Z"}},{"path":"NGM2002_05p106.jpg","image":{"path":"slides\/NGM2002_05p106.jpg","width":1024,"height":768},"thumb":{"path":"thumbs\/NGM2002_05p106.jpg","width":256,"height":192},"fileSize":172311,"name":"NGM2002_05p106.jpg","fileDate":"2005-11-14T17:35:16.0Z","category":"image","camera":{"originalDate":"2005-11-14T17:35:16.0Z"}},{"path":"NGM2002_05p107.jpg","image":{"path":"slides\/NGM2002_05p107.jpg","width":1024,"height":768},"thumb":{"path":"thumbs\/NGM2002_05p107.jpg","width":256,"height":192},"fileSize":157432,"name":"NGM2002_05p107.jpg","fileDate":"2005-11-14T17:35:16.0Z","category":"image","camera":{"originalDate":"2005-11-14T17:35:16.0Z"}},{"path":"NGM2002_05p108-9.jpg","image":{"path":"slides\/NGM2002_05p108-9.jpg","width":1024,"height":768},"thumb":{"path":"thumbs\/NGM2002_05p108-9.jpg","width":256,"height":192},"fileSize":155132,"name":"NGM2002_05p108-9.jpg","fileDate":"2005-11-14T17:35:16.0Z","category":"image","camera":{"originalDate":"2005-11-14T17:35:16.0Z"}},{"path":"NGM2002_05p110-1.jpg","image":{"path":"slides\/NGM2002_05p110-1.jpg","width":1024,"height":768},"thumb":{"path":"thumbs\/NGM2002_05p110-1.jpg","width":256,"height":192},"fileSize":200457,"name":"NGM2002_05p110-1.jpg","fileDate":"2005-11-14T17:35:18.0Z","category":"image","camera":{"originalDate":"2005-11-14T17:35:18.0Z"}},{"path":"NGM2002_05p114-5.jpg","image":{"path":"slides\/NGM2002_05p114-5.jpg","width":1024,"height":768},"thumb":{"path":"thumbs\/NGM2002_05p114-5.jpg","width":256,"height":192},"fileSize":267309,"name":"NGM2002_05p114-5.jpg","fileDate":"2005-11-14T17:35:18.0Z","category":"image","camera":{"originalDate":"2005-11-14T17:35:18.0Z"}},{"path":"NGS1_001.jpg","image":{"path":"slides\/NGS1_001.jpg","width":1024,"height":768},"thumb":{"path":"thumbs\/NGS1_001.jpg","width":256,"height":192},"fileSize":153945,"name":"NGS1_001.jpg","fileDate":"2005-11-14T17:35:42.0Z","category":"image","camera":{"originalDate":"2005-11-14T17:35:42.0Z"}}],"name":"album","fileDate":"2023-03-22T15:36:38.772Z"}; // includes all the album data in a json tree
	var stylePath = ""; 

	var widgetColor = getWidgetColor(); // get suggested color for widget support

	var uniqueId = new Date().getTime();

	/** check if page viewed on mobile device **/
	function isMobile(){
		return (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent) 
	    || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(navigator.userAgent.substr(0,4)));
	}

	/** check if page viewed online or from file system **/
	function isOnline(){
		switch(window.location.protocol) {
		   case 'http:':
		   		return true;
		   case 'https:':
		     	return true;
		   case 'file:':
		    	return false;
		}
	}

	/** get current url of page **/
	function getURL(){
		var scripts = document.getElementsByTagName('script');
		for (var index = scripts.length-1; index >= 0; --index) {
			if (scripts[index].id == 'jAlbum') {
				var curr = scripts[index].src;
				return curr.substring(0, curr.lastIndexOf("/") + 1);
			}
		}
		return "";
	}

	/** get fidget color according to current style **/
	function getWidgetColor(){
		if(style == styles[0]) return "black";
		else return "white";
	}

	/** returns all the public variables and functions **/
	return {
		mobile: mobile,
		online: online,
		jAlbumURL: jAlbumURL,
		stylePath: stylePath,
		resPath: resPath,
		credits: credits,
		albumTitle: albumTitle,
		contentPath: contentPath,
		imgHoverScaleFactor: imgHoverScaleFactor,
		folderTitleUp: folderTitleUp,
		folderImgCount: folderImgCount,
		maxImgInRow: maxImgInRow,
		imgBorderSize: imgBorderSize,
		imgBoxSize: imgBoxSize,
		showFolderName: showFolderName,
		textSize: textSize,
		showComments: showComments,
		dataTree: dataTree,
		stylePath: stylePath,
		slideBorderSize: slideBorderSize,
		slideBorderColor: slideBorderColor,
		slideMarginSize: slideMarginSize,
		widgetColor: widgetColor,
		uniqueId: uniqueId
	};

})();

/** --- jAlbumInject ---
* jAlbumInject is responsible for copying html code into
* the website. Stylesheet includes will be printed into
* the header, the body will be printed to the position
* of the embed code.
*/
var jAlbumInject = (function () {

	appendToHead(injLink('res/css/normalize.min.css', 'stylesheet')); // normalizes browser specific stylesheet defaults
	appendToHead(injLink('res/css/custom.css', 'stylesheet')); // customized desgin of the skin, will be partly overwritten by style.css
	appendToHead(injLink('res/styles.css', 'stylesheet')); // different styles to the skin which change the appearance

	appendToHead(injMeta("viewport", "width=device-width, initial-scale=1.0, maximum-scale=1.0")); // viewport handles mobile scaling size

	inj('<div id="Responsive' + jAlbumGlobals1679471386669.uniqueId + '" class="jAlbum Responsive">'); // Responsive id surrounds all code of the body of the skin
	inj('<div id="fullscreen"></div>'); // element where to add fullscreen
	inj('<div id="jAlbum-header"></div>'); // header container
	inj('<div id="jAlbum-content"></div>'); // content container
	inj('<div style="clear: both"></div>');

	inj('<div id="jAlbum-footer">'); // footer
	inj('<div class="left leaveFolder">');
	inj('<p><a onclick="jAlbumController.back();"> &#10096;</a></p>'); // go back button in footer
	inj('</div><div class="center"><p><a href="http://jalbum.net/">jAlbum web gallery software</a> - '); // credits in footer
	inj('<a href="http://jalbum.net/skins/skin/Responsive">Responsive</a></p>'); // skin advertisement in footer
	inj('</div></div></div>'); // close footer

	inj('<script src="' + jAlbumGlobals1679471386669.jAlbumURL + 'res/libs/jquery-2.1.4.min.js"></script>'); // embets jQuery library
	inj('<script type="text/javascript">$(document).bind("mobileinit", function(){$.extend($.mobile , {autoInitializePage: false})});</script>'); // deactivates jQuery unnecessary mobile feature
	inj('<script src="' + jAlbumGlobals1679471386669.jAlbumURL + 'res/libs/jquery.mobile-1.4.5.min.js"></script>'); // includes jQuery Mobile
	inj('<script src="' + jAlbumGlobals1679471386669.jAlbumURL + 'res/libs/jquery.touchswipe.min.js"></script>'); // jQuery touchswipe plugin
	inj('<script src="' + jAlbumGlobals1679471386669.jAlbumURL + 'main.js" type="text/javascript"></script>'); // includes skin controller
	
	/** injects html code at embedded position **/
	function inj(html){
		document.write(html);
	}

	/** injects html code in header **/
	function appendToHead(elem){
		document.getElementsByTagName('head').item(0).appendChild(elem);
	}

	/** injects header of embedded page with stylesheet includes **/
	function injLink(path, rel){
		var elem = document.createElement("link");
		elem.href = jAlbumGlobals1679471386669.jAlbumURL + path;
		elem.rel = rel;

		return elem;
	}

	function injMeta(name, content){
		var elem = document.createElement("meta");
		elem.name = name;
		elem.content = content;

		return elem;
	}

})();


/** --- Widget Support---
* provides JavaScript code for jAlbum widget support
*/
window._jaWidgetBarColor = jAlbumGlobals1679471386669.widgetColor;

if(!document.getElementById('non-embedded')){ // check if embedded
	window._jaUrl = jAlbumGlobals1679471386669.jAlbumURL;
	_jaSkin = "Responsive";
_jaStyle = "dark.css";
_jaVersion = "30.1";
_jaGeneratorType = "desktop";
_jaLanguage = "en";
_jaPageType = "index";
_jaRootPath = ".";
_jaGuid = "1679469416804";
var jalbumWidgetContainer = document.createElement('div');
jalbumWidgetContainer.setAttribute('id','jalbumwidgetcontainer');
var jalbumWidgetScript = document.createElement("script");
jalbumWidgetScript.type = "text/javascript";
jalbumWidgetScript.src = "http"+("https:"==document.location.protocol?"s":"")+"://jalbum.net/widgetapi/load.js";
jalbumWidgetScript.async = true;
jalbumWidgetContainer.appendChild(jalbumWidgetScript);
document.body.appendChild(jalbumWidgetContainer);
 // get JavaScript code for widget
}
