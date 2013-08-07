// 課題 JS-3 の実装をここに記述してください。
// jQueryで書くと気持ちSimpleになるようなならないような
$("#submit-button").click( function( e ) { 
      createLogTable($('#table-container'), parseLTSVLog($('#log-input').html()));
    } );