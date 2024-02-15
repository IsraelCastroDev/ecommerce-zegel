# Instalación del proyecto

#####    git clone:

    git clone https://github.com/IsraelCastroDev/ecommerce-zegel.git https://github.com/IsraelCastroDev/ecommerce-zegel.git
	

##### Crear entonerno virtual:


    python -m venv env
    env\Scripts\activate

##### Instalar dependencias:


    pip install -r requirements.txt
##### En caso de error actualizar su version de pip
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