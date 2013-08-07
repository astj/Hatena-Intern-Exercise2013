// 課題 JS-1: 関数 `parseLTSVLog` を記述してください
function parseLTSVLog(GivenLTSVString) {
	var GivenLTSVArray = GivenLTSVString.split("\n");
    GivenLTSVArray.pop();//\nで終わることが保証されてるからsplitすると最終要素はいらない
	var ReturnArray = [];
	for(var i = 0; i < GivenLTSVArray.length; i++){
		var OneLineArray = GivenLTSVArray[i].split("\t");
		var OneLineObj = {};
		for(var j = 0; j < OneLineArray.length; j++ ) {
			var OneLineSplitted = OneLineArray[j].split(':',2);
//			OneLineObj[OneLineSplitted[0]] = OneLineSplitted[1];
			if(OneLineSplitted[0]=='path'){ OneLineObj['path'] = OneLineSplitted[1]; }
			if(OneLineSplitted[0]=='reqtime_microsec'){ OneLineObj['reqtime_microsec'] = parseInt(OneLineSplitted[1]); }
		}
		ReturnArray.push(OneLineObj);
	}
	return ReturnArray;
}
// 課題 JS-2: 関数 `createLogTable` を記述してください
function createLogTable(containerElem, LTSVArray) {

    // table本体
    var RTable = document.createElement('table');
    // theadをつくる
    var RThead = RTable.appendChild(document.createElement('thead'));
        var RTheadTr = RThead.appendChild(document.createElement('tr'));
            RTheadTr.appendChild(document.createElement('th')).appendChild(document.createTextNode('path'));
            RTheadTr.appendChild(document.createElement('th')).appendChild(document.createTextNode('reqtime_microsec'));
    // tbodyをつくる(本丸)
    var RTbody = RTable.appendChild(document.createElement('tbody'));
    for(var i=0 ; i < LTSVArray.length; i++) {
        var RTbodyTr = RTbody.appendChild(document.createElement('tr'));
            RTbodyTr.appendChild(document.createElement('td')).appendChild(document.createTextNode(LTSVArray[i]['path']));
            RTbodyTr.appendChild(document.createElement('td')).appendChild(document.createTextNode(LTSVArray[i]['reqtime_microsec']));
    }
    //与えられたcontainerに突っ込んで完成
    containerElem.appendChild(RTable);
}