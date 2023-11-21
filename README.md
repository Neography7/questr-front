# QUESTR - Anonymous Q&A Application

<p align="center">
  <img src="https://i.imgur.com/KAhUMk0.png" alt="Logo" width="500" />
</p>

This repository contains the frontend portion of the Questr Q&A application.

## QUESTR - All Repositories

- [Frontend](https://github.com/Neography7/questr-front)
- [API Gateway](https://github.com/Neography7/questr-gateway)
- [User Microservice](https://github.com/Neography7/questr-user-srvc)
- [Auth Microservice](https://github.com/Neography7/questr-auth-srvc)
- [Question Microservice](https://github.com/Neography7/questr-question-srvc)
- [GRPC Protos](https://github.com/Neography7/questr-proto)
- [Deployment](https://github.com/Neography7/questr-deployment)

## Description

This repository encapsulates the front end of Questr, meticulously crafted using React. It intricately integrates Apollo Client, empowering the application with robust GraphQL communication capabilities, and enabling smooth and efficient interaction with the backend services.

Furthermore, to enhance user experience, i18next is employed for seamless translation support, allowing the application to cater to a diverse audience with localized content. In addition, Socket.io is utilized to deliver real-time notifications for new questions, ensuring prompt updates and engagement within the platform.

Complementing these functionalities, Tailwind CSS has been instrumental in crafting a user-friendly and dynamic UI, enabling quick and flexible UI development.

You can experience the project live through the provided URL and find screenshots below showing its interface. Should you wish to set up the project on your local machine, you can explore the deployment repository or delve into the backend gateway and services repositories for detailed insights.

## Preview

<p align="center">
  <p align="center">
    <img src="https://i.imgur.com/Vuj83FE.png" alt="Logo" width="500" />
  </p>
  <p align="center">
    <img src="https://i.imgur.com/KFVwSCB.png" alt="Logo" width="500" />
  </p>
</p>

- [Register](https://i.imgur.com/0A5UhqW.png)
- [Home](https://i.imgur.com/1iMhGbe.png)
- [Home Dark Mode](https://i.imgur.com/wMdCTSp.png)
- [Home with Questions](https://i.imgur.com/WCZNHmB.png)
- [Profile](https://i.imgur.com/fzboIa2.png)
- [Profile Dark Mode](https://i.imgur.com/GWdkwKd.png)
- [Profile with Questions](https://i.imgur.com/gYRXZax.png)
- [User Settings](https://i.imgur.com/1XDnPs0.png)
- [About](https://i.imgur.com/aYjyqTX.png)

## Technologies

- **React:** Used for building the user interface.
- **Vite:** Chosen as a fast and minimal build tool.
- **TypeScript:** Used for static typing and enhanced tooling.
- **Redux Toolkit:** Employed for state management.
- **React Router:** Used for page routing and navigation.
- **Helmet:** Used for managing head tags for SEO purposes.
- **Apollo GraphQL:** GraphQL client library used for communication with the server.
- **Socket.IO:** Used for real-time notification.
- **i18next:** Used for internationalization (i18n) support.
- **Tailwind CSS / Flowbite UI:** Preferred for fast and flexible UI development.

## Installing

Note: Please don't forget to set up the backend before utilizing the frontend.

First setup env file 

```env
VITE_URL=http://localhost:5173
VITE_BACKEND_URL=http://localhost:5000
VITE_SOCKET_URL=http://localhost:1000
```

And then install required packages and start the project.

```bash
# Install required packages
npm install

# Start the project with development envoriment
npm start dev

# For building project
npm start build

# For preview project after building
npm start preview
```

## License

This project is licensed under the [Beerware License](LICENSE).

If you find this project useful and we ever meet, you might consider buying me a beer in return.

## Contact

If you have any questions or feedback regarding the project, feel free to get in touch:

- Email: ilkerakyel97@gmail.com
- LinkedIn: [İlker Akyel](https://www.linkedin.com/in/ilker-akyel/)
- Website: [ilkerakyel.com](https://www.ilkerakyel.com)