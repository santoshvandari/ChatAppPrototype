# Chat App Prototype
This is the basic prototype for Real Time Chat Application. It is developed using the Websocket 'Django Channel'. Here, I have used the Django for the HTML Rendering, Django Channel for Web Socket and Redis for Storing Channel Layer Data. I haven't stored the chatted data in the database. 

## Usage
Follow the Given Steps to Setup in Your Local System. 
- Create the Virtual Environment (Not Necessary but Recommand) and activate it.
    ```bash
        # For Windows User
        python -m venv venv
        venv\Scripts\activate

        #For Linux User
        python3 -m virtualenv venv
        source venv/bin/activate

    ```
- Install the Requirements
    ```bash
        pip install -r requirements.txt
    ```
- Setup the Redis Server and Add the Redis Channel Layer
    ```bash
        CHANNEL_LAYERS = {
            "default": {
                "BACKEND": "channels_redis.core.RedisChannelLayer",
                "CONFIG": {
                    "hosts": [("127.0.0.1", 6379)],
                },
            },
        }

        # I am Using this Channel just for Testing and Development
        # CHANNEL_LAYERS = {
        #     "default": {
        #         "BACKEND": "channels.layers.InMemoryChannelLayer"
        #     }
        # }
    ```

- Run the Server
    ```bash
        # For Windows User
        python manage.py runserver 

        # For Linux User
        python3 manage.py runserver 
    ```

## Keep Learning and Exploring