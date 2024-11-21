First open a terminal and make sure its in todoList and not Todo-List
use "cd /todoList" if its not.

Then you can run 
	npm run dev 
this should show the page but not any data
to load json file:
open new terminal
	cd src/data
	npx json-server --port 8000 reminderdb.json

If you need to install it 
	npm install json-server
then follow previus steps