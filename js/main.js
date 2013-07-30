// 課題 JS-1: 関数 `parseLTSVLog` を記述してください
function parseLTSVLog(GivenLTSVString) {
	var GivenLTSVArray = GivenLTSVString.split("\n");
    GivenLTSVArray.pop();//\nで終わることが保証されてるからsplitすると空がケツにできる
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
    // 流石に冗長すぎる気がする……
    var RTable = document.createElement('table');
    // theadをつくる
    var RThead = document.createElement('thead');
        var RTheadTr = document.createElement('tr');
        var RTheadTrTh1 = document.createElement('th');
            RTheadTrTh1.appendChild(document.createTextNode('path'));
            RTheadTr.appendChild(RTheadTrTh1);
        var RTheadTrTh2 = document.createElement('th');
            RTheadTrTh2.appendChild(document.createTextNode('reqtime_microsec'));
            RTheadTr.appendChild(RTheadTrTh2);
    RThead.appendChild(RTheadTr);
    // tbodyをつくる(本丸)
    var RTbody = document.createElement('tbody');
    for(var i=0 ; i < LTSVArray.length; i++) {
        var RTbodyTr = document.createElement('tr');
        var RTbodyTrTd1 = document.createElement('td');
            RTbodyTrTd1.appendChild(document.createTextNode(LTSVArray[i]['path']));
        RTbodyTr.appendChild(RTbodyTrTd1);
        var RTbodyTrTd2 = document.createElement('td');
            RTbodyTrTd2.appendChild(document.createTextNode(LTSVArray[i]['reqtime_microsec']));
        RTbodyTr.appendChild(RTbodyTrTd2);
        RTbody.appendChild(RTbodyTr);
    }
    // tableとして形成する
    RTable.appendChild(RThead);
    RTable.appendChild(RTbody);
    //与えられたcontainedに突っ込んで完成
    containerElem.appendChild(RTable);
}