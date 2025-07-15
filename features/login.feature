@login-practica
Feature: Funcionalidad de Login
    Como usuario del sistema
    Quiero poder iniciar sesión en el sitio
    Para acceder a las funcionalidades protegidas

    Background:
        Given que el usuario está en la página de login

    Scenario: Login exitoso con credenciales válidas
        When el usuario ingresa el nombre de usuario "tomsmith"
        And el usuario ingresa la contraseña "SuperSecretPassword!"
        And el usuario hace clic en el botón de login
        Then debería ver el mensaje "You logged into a secure area!"


