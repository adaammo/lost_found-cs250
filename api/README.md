# API folders read me 
For reference, this will include the current commands/logic needed to set up the environment for the API folder, and the code structure used \
<ins>First step</ins> \
If you just cloned the repo, please run uv install to download every dependency inside the pyproject folder \
** YOU NEED PYTHON >=3.14 ** \
** uv sync ** - This is the command necessary for installing the dependencies \
<ins>Running local development and checking build development </ins> \
**fastapi dev main.py** - this command runs the development command: useful for debugging \
**fastapi run main.py** - this command  runs the build environment\
<ins>Adding new libraries/dependencies</ins> \
** uv add < library_name > - run this to add the new library necessary for the project \
<ins>Understanding the layout</ins> \
**/Router** \
This folder is meant to hold the main API logic. Each sub folder is mean to be a new endpoint in the api ex: localhost:8000/api/router-param.
The whole point of this file is for code readability. Rather than stuffing every router inside main.py, split it up by work. \
**/Services** \
This folder holds the code logic for each sub router! Each sub folder mimics each sub folder in router for the code thats services its functionality \
