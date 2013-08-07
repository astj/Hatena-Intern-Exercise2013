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

// jQueryでなんとか
    var RTable = document.createElement('table');
    // theadをつくる
	$(RTable).append( "<thead><tr><th>path</th><th>reqtime_microsec</th></thead>" );
    // tbodyをつくる(本丸)
	$(RTable).append( document.createElement('tbody') );
    for(var i=0 ; i < LTSVArray.length; i++) {
		$(RTable).children("tbody").append(document.createElement('tr'));
		var RTableTr = $(RTable).children("tbody").children(":last-child");
		RTableTr.append(document.createElement('td'),document.createElement('td'));
		RTableTr.children(":nth-child(1)").append(LTSVArray[i]['path']);
		RTableTr.children(":nth-child(2)").append(LTSVArray[i]['reqtime_microsec']);
    }

//与えられたcontainerに突っ込んで完成
	$(containerElem).append(RTable);

}

