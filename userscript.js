// ==UserScript==
// @name     AWS TCO Calculator CSV Import/Export
// @version  1
// @grant    none
// @namespace https://awstcocalculator.com/
// @require https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js 
// ==/UserScript==

// ==UserScript==
// @name     AWS TCO Calculator CSV Import/Export
// @version  1
// @grant    none
// @namespace https://awstcocalculator.com/
// @match     https://awstcocalculator.com/
// @require https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js
// ==/UserScript==


this.$ = this.jQuery = jQuery.noConflict(true);
$(document).ready(function()
{

    var server=document.getElementById("divServerContent")
    var storage=document.getElementById("storageKOContent")

    var inputButtonServers=document.createElement("input");
    inputButtonServers.type="button";
    inputButtonServers.value="Import CSV";
    inputButtonServers.onclick = openFileDialogVM;
    inputButtonServers.classList = "btnAddStyle"
    var exportButtonServers=document.createElement("input");
    exportButtonServers.type="button";
    exportButtonServers.value="Export CSV";
    exportButtonServers.onclick = exportCSVServers;
    exportButtonServers.classList = "btnAddStyle"
    server.appendChild(inputButtonServers);
    server.appendChild(exportButtonServers);

    var inputButtonStorage=document.createElement("input");
    inputButtonStorage.type="button";
    inputButtonStorage.value="Import CSV";
    inputButtonStorage.onclick = openFileDialogStorage;
    inputButtonStorage.classList = "btnAddStyle"
    var exportButtonStorage=document.createElement("input");
    exportButtonStorage.type="button";
    exportButtonStorage.value="Export CSV";
    exportButtonStorage.onclick = exportCSVStorage;
    exportButtonStorage.classList = "btnAddStyle"
    storage.appendChild(inputButtonStorage);
    storage.appendChild(exportButtonStorage);


    var fileinputservers=document.createElement("input");
    fileinputservers.type="file";
    fileinputservers.style = "display: none";
    fileinputservers.id = "file-input-servers"
    fileinputservers.accept = ".csv"
    server.appendChild(fileinputservers);

    var fileinputstorage=document.createElement("input");
    fileinputstorage.type="file";
    fileinputstorage.style = "display: none";
    fileinputstorage.id = "file-input-storage"
    fileinputstorage.accept = ".csv"
    storage.appendChild(fileinputstorage);
    $("#VirtualRB").click();


    $("#VirtualRB").click();



    function setval(table, row, col, type, value){
        var input = $("table#"+table+" tr").eq(row).children().eq(col).find(type)
        var event = new Event('change');
        input.val(value.trim());
        input[0].dispatchEvent(event);
    }

    function openFileDialogVM(){


        $("#file-input-servers")[0].addEventListener("change", function () {
            if($("#PhysicalRB")[0].checked){
                importCSVPhysical()
            } else {
                importCSVVM()
            }
        });
        $("#file-input-servers").click();

    }

    function openFileDialogStorage(){


        $("#file-input-storage")[0].addEventListener("change", function () {
            importCSVStorage()
        });
        $("#file-input-storage").click();

    }

    function importCSVVM(){
        var fileinput = document.getElementById("file-input-servers");
        var file = fileinput.files[0];
        var textType = /text.*/;

        var reader = new FileReader();

        reader.onload = function (event) {
            var csv = event.target.result;
            var lines = csv.split('\n');

            $("#serverKOContent img[src='/Images/Delete.png']").click()

            for(var i = 1;i < lines.length - 1;i++){
                $("#addBtn").click()
            }

            for(var i = 1;i < lines.length;i++){
                values = lines[i].split(",");
                setval("vm",i,0,"select",values[0]);
                setval("vm",i,1,"input",values[1]);
                setval("vm",i,2,"input",values[2]);
                setval("vm",i,3,"input",values[3]);
                setval("vm",i,4,"input",values[4]);
                setval("vm",i,5,"select",values[5]);
                setval("vm",i,6,"select",values[6]);
                setval("vm",i,7,"select",values[7]);
            }
        }

        reader.readAsText(file);

    }

    function importCSVPhysical(){
        var fileinput = document.getElementById("file-input-servers");
        var file = fileinput.files[0];
        var textType = /text.*/;

        var reader = new FileReader();

        reader.onload = function (event) {
            var csv = event.target.result;
            var lines = csv.split('\n');

            $("#serverKOContent img[src='/Images/Delete.png']:visible").click()

            for(var i = 1;i < lines.length - 1;i++){
                $("#addPhyBtn").click()
            }

            for(var i = 1;i < lines.length;i++){
                values = lines[i].split(",");
                setval("pm",i,0,"select",values[0]);
                setval("pm",i,1,"input",values[1]);
                setval("pm",i,2,"select",values[2]);
                setval("pm",i,3,"select",values[3]);
                setval("pm",i,4,"input",values[4]);
                setval("pm",i,5,"input",values[5]);
                setval("pm",i,6,"select",values[6]);
            }
        }

        reader.readAsText(file);

    }


    function importCSVStorage(){

        var fileinput = document.getElementById("file-input-storage");
        var file = fileinput.files[0];
        var textType = /text.*/;

        var reader = new FileReader();

        reader.onload = function (event) {

            debugger
            var csv = event.target.result;
            var lines = csv.split('\n');

            $("#storageCalc img[src='/Images/Delete.png']:visible").click()

            for(var i = 1;i < lines.length - 1;i++){
              	if(lines[i] != ""){
                	$("#storageAddRow").click()
                }
            }

            for(var i = 1;i < lines.length;i++){
                values = lines[i].split(",");
                setval("storageCalc",i,0,"select",values[0]);
                setval("storageCalc",i,1,"select",values[1].split(" | ")[1]);
                setval("storageCalc",i,1,"input",values[1].split(" | ")[0]);
                setval("storageCalc",i,2,"input",values[2]);
                setval("storageCalc",i,3,"select",values[3]);
            }
        }

        reader.readAsText(file);

    }



    function exportCSVServers(){

        if($("#PhysicalRB")[0].checked){
            var table = $("table#pm")
            cols = 7
        } else {
            var table = $("table#vm")
            cols = 8
        }

        var output = ""

        var col = 0
        table.children().eq(0).find("th").each(function(){
            if(col < cols){
                output += this.innerText.trim().replace(/(\r\n|\n|\r)/gm," ");
                output = output.replace(/(\s\s|\s\s\s)/g," ")
                output += ","
            }
            col++
        });

        output += "\n"

        table.children().eq(1).find("tr").each(function(){
            cells = $(this).find("td")
            for(var i = 0;i < cols;i++){
                cell = cells.eq(i);
                try{
                    if(cell.find("select").length > 0 ){
                        output += cell.find("select").val().trim().replace(/(\r\n|\n|\r)/gm," ");
                    } else {
                        output += cell.find("input").val().trim().replace(/(\r\n|\n|\r)/gm," ");
                    }
                } catch {
                    output += " "
            }

                    output = output.replace(/(\s\s|\s\s\s)/g," ");
                output += ",";
            }
            output += "\n";
        });

        download(output, "servers.csv", "csv")

    }

    function exportCSVStorage(){


        var table = $("table#storageCalc")
        cols = 4


        var output = ""

        var col = 0
        table.children().eq(0).find("th").each(function(){
            if(col < cols){
                output += this.innerText.trim().replace(/(\r\n|\n|\r)/gm," ");
                output = output.replace(/(\s\s|\s\s\s)/g," ")
                output += ","
            }
            col++
        });

        output += "\n"

        table.children().eq(1).find("tr").each(function(){
            cells = $(this).find("td")
            for(var i = 0;i < cols;i++){
                cell = cells.eq(i);
                try{

                    if(cell.find("input").length > 0 ){
                        output += cell.find("input").val().trim().replace(/(\r\n|\n|\r)/gm," ");
                    }

                    if(cell.find("input").length > 0 && cell.find("select").length){
                        output += " | "
                    }

                    if(cell.find("select").length > 0 ){
                        output += cell.find("select").val().trim().replace(/(\r\n|\n|\r)/gm," ");
                    }

                } catch {
                    output += " "
            }

                    output = output.replace(/(\s\s|\s\s\s)/g," ");
                output += ",";
            }
            output += "\n";
        });

        download(output, "storage.csv", "csv")

    }


    // Function to download data to a file
    function download(data, filename, type) {
        var file = new Blob([data], {type: type});
        if (window.navigator.msSaveOrOpenBlob) // IE10+
            window.navigator.msSaveOrOpenBlob(file, filename);
        else { // Others
            var a = document.createElement("a"),
                url = URL.createObjectURL(file);
            a.href = url;
            a.download = filename;
            document.body.appendChild(a);
            a.click();
            setTimeout(function() {
                document.body.removeChild(a);
                window.URL.revokeObjectURL(url);
            }, 0);
        }
    }

});