// 課題 JS-3 の実装をここに記述してください。
document.getElementById('submit-button').addEventListener('click', 
    function(e) {
      createLogTable(document.getElementById('table-container'), parseLTSVLog(document.getElementById('log-input').innerHTML));
    } ,false);