# Instalación del proyecto

#####    git clone:

    git clone https://github.com/IsraelCastroDev/ecommerce-zegel.git https://github.com/IsraelCastroDev/ecommerce-zegel.git
	

##### Crear entonerno virtual:


    python -m venv env
    env\Scripts\activate

##### Instalar dependencias:
###### IMPORTANTE: En caso de error al ejecutar "pip install -r requirements.txt" actualiza tu versión de pip con el comando: "python -m pip install --upgrade pip"

    pip install -r requirements.txt

##### Crear carpeta dist:


    mkdir dist
    mkdir dist/static

##### Crear archivo .env con :


    New-Item -ItemType File -Name .env
###### Dentro de ese archivo crea una variable de entorno llamada "SECRET_KEY" y ponle como valor una clave random

##### Crear usuario administrador:


    python manage.py createsuperuser

##### Iniciar servidor:

    python manage.py runserver

#### Abrir una nueva terminal y ejecutar lo siguientes comandos en orden:


    cd frontend
    npm install
    npm run dev

------------

### Nota: recuerda que para que el proyecto funcione deben estar iniciados ambos servidores
