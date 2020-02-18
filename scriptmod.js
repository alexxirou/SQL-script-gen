

var attributs=[];
var primarykey=[];
var foreignkey=[];
var key=[];
var att=[];
var nomTable=[];
var finalattributArray=[];

function traitementLigne(ligne, num){ //cuts each line into table name primary key and properties
    let table=ligne.substring(0, ligne.indexOf("("));
    let attributsStr=ligne.substring(ligne.indexOf("(")+1, ligne.indexOf(")"));
    let attributsArray=attributsStr.split(",");
    primarykey.push(attributsArray[0]);
    attributsArray.shift();
    nomTable.push(table);
    let finalattributArray=attributsArray;
    for (let iteAttribut=0; iteAttribut<attributsArray.length; iteAttribut++){
      attributsArray[iteAttribut]=attributsArray[iteAttribut].replace(" ","");
      /*if (attributsArray[iteAttribut][0]=="#"){ //option to filter out items starting with # and add them in a new matrix
        key.push(finalattributArray[iteAttribut]);
        finalattributArray.splice([iteAttribut],1);
        iteAttribut--
      }*/
      //foreignkey[num]=key;
      attributs[num]=finalattributArray;
}
}

function LireLesDonnees(){  //function to read each line in the text area
  var data = document.getElementById('Database').value;
  var dataArray =  data.split("\n");
  var filterArray =dataArray.filter(function (string){
   return string !=""
 });
  for( let ite=0; ite<filterArray.length; ite++){
      traitementLigne(filterArray[ite], ite);

}
document.getElementById('result1').innerHTML = "DROP DATABASE "+nomTable[0]+"db;";
document.getElementById('result2').innerHTML = "CREATE DATABASE "+nomTable[0]+"db;";
document.getElementById('result3').innerHTML = "USE "+nomTable[0]+"db;";

    for(let iteprkey=0; iteprkey<nomTable.length; iteprkey++){  //loop for all tables in array
            var newlist =document.createElement("ul");
            newlist.style.listStyleType="none";
            document.getElementById('tables').appendChild(newlist);
            var newTextNode= document.createTextNode("CREATE TABLE IF NOT EXISTS "+nomTable[iteprkey]+"("); //create for each table a node that is added to a <li> for table creation cmd
            var newTextNode2=document.createTextNode(primarykey[iteprkey]+" INT NOT NULL  AUTO_INCREMENT,"); //create identifier  command for each table
            var newListItem2=document.createElement("li");
            var newListItem=document.createElement("li");
            newListItem.appendChild(newTextNode); //adding textnodes to the li and the li to the ul
            newListItem2.appendChild(newTextNode2);
            newlist.appendChild(newListItem);
            newlist.appendChild(newListItem2);
            var innertype=attributs[iteprkey];
            for (let ite=0; ite<innertype.length; ite++){ //the length of each column in the matrix attributs
              if (innertype[ite][0]=="#"){
                    let newTextNode3=document.createTextNode(innertype[ite]+ " INT NOT NULL,");  //if it starts with # it is classified as a foreign key with fixed properties
                    let newListItem3=document.createElement("li");
                    newListItem3.appendChild(newTextNode3);
                    newlist.appendChild(newListItem3);
                    }

              else if (confirm("Si le type de proprieté "+innertype[ite]+" est CHAR clickez ok.")==true){ //if not creating confirm windows for each property type to choose between char int or boolean
                var type="VARCHAR(100)"
                let newTextNode3=document.createTextNode(innertype[ite]+type+ " NOT NULL,");
                let newListItem3=document.createElement("li");
                newListItem3.appendChild(newTextNode3);
                newlist.appendChild(newListItem3);
                }
              else {
                if(confirm("Si le type de proprieté "+innertype[ite]+" est INT clickez ok, si BOOLEAN clickez cancel.")==true){
                  var type="INT"
                  let newTextNode3=document.createTextNode(innertype[ite]+type+" NOT NULL,");
                }
                else {
                   var type="BOOLEAN"
                   let newTextNode3=document.createTextNode(innertype[ite]+type+" NOT NULL,");
                   let newListItem3=document.createElement("li");
                   newListItem3.appendChild(newTextNode3);
                   newlist.appendChild(newListItem3);
                }
              }
            }

            var newTextNode4=document.createTextNode("PRIMARY KEY("+primarykey[iteprkey]+"),"); //adding li for property primary KEY
            var newListItem4=document.createElement("li");

            newListItem4.appendChild(newTextNode4);
            newlist.appendChild(newListItem4);
            let islastnode = 0; // flag to check if nothing else run after this point
            for (let ite=0; ite<innertype.length; ite++){
              if (innertype[ite][0]=="#"){
              references= prompt("Saissisez le TABLE REFERENCE pour "+innertype[ite]+" en majuscules, sans espaces.");
              for (var i = 0; i < primarykey.length; i++) {
                var primarykeytotable=primarykey[i].replace("id_","");
                primarykeytotable=primarykeytotable.toUpperCase();
                if (primarykeytotable==references){
                  var referenced=primarykey[i];
                }

              }
              let newTextNode5=document.createTextNode("FOREIGN KEY ("+innertype[ite]+") REFERENCES "+references+" ("+referenced+"),"); //adding property for foreign keys if they exist
              let newListItem5=document.createElement("li");
              newListItem5.appendChild(newTextNode5);
              newlist.appendChild(newListItem5);
              // if it is last li change comma with ");"
              if(innertype.length - 1 == ite){
                newListItem5.innerHTML = newListItem5.innerHTML.replace(/,\s*$/, ");");
              }
              islastnode++;

              }
            }
            // if islastnode is still zero, then did not get into the previous loop so it is last li
            if(islastnode == 0){
                newListItem4.innerHTML = newListItem4.innerHTML.replace(/,\s*$/, ");");
            }
          }



}
/*function downloadInnerHtml(filename, elId, mimeType) { //in development: button to download the div results in text form
    var elHTML = document.getElementById("results").innerHTML;








    var link = document.createElement('a');   //telecharger l'output
    mimeType = mimeType || 'text/plain';

    link.setAttribute('download', filename);
    link.setAttribute('href', 'data:' + mimeType  +  ';charset=utf-8,' + encodeURIComponent(elHTML));
    link.click();
}*/
