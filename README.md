# SQL-script-gen
Creating mysql scripts on a html page using javascript from an input of a MR

Using a text area to paste the MR on the html page.
Hitting the button will run the function to read all lines separating them, and running the function in the javascript file.
The function will then create a list of table names a list of primary keys from the first element in the parathensis, and a matrix with the table properties to be added.
It will then create elements in the html page for each script line and filter the properties of each table in foreign keys or other properties.
For each property that isn't a foreign key the function will demand via a confirm window to choose between VARCHAR, INT, or BOOLEAN.
For the primary and foreign keys INT is automatically chosen.
If there are foreign key properties in a table the function will demand a table to reference for the key and will try to find the primary key to the table based on input.
If it fails it will ask for the primary key of the table via prompt.
Fnally the function checks if the primary key or foreign key line of each table is the last <li> tag to be added, and if so it replaces the "," at the end of the line with ");".
The resulting script appears on the html to be copied.

//To be added:

Button to download the script in text form.
Function that filters the contents of the 'results' <div> removing the html tags, separating the sql commands to lines and downloads a tewt file with sql ending, when the button 'Télechargement' is clicked.
