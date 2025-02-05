## Auth Routes

| **HTTP METHOD** | **PATH** | **ACTION** |
|-----------------|----------|------------|
|        POST         |    /signup      |     Sign Up User       |
|        POST         |      /login    |     Log In User       |
|        GET         |     /verify     |      Verify User      |

## User Routes

| **HTTP METHOD** | **PATH** | **ACTION** |
|-----------------|----------|------------|
|        PUT         |     /editUser     |      Edit User Data      | 
|        GET         |     /users/:id     |      Get User data      | 
|        DELETE         |     /users/:id     |      Delete user      | 

## QRCode Routes

| **HTTP METHOD** | **PATH** | **ACTION** |
|-----------------|----------|------------|
|        POST         |     /codes     |      Save a QR created     | 
|        GET         |     /codes/:userid    |      Get QR for user     | 
|        DELETE         |     /code/:id     |      Delete qrcode      | 
|        GET         |     /code/:id     |      Get qrcode      | 