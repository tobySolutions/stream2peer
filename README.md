
![stream2peer banner](https://res.cloudinary.com/duarnvq7d/image/upload/v1732483044/stream2peer3_pppvnt.png)

# Stream2Peer

Stream2Peer is a decentralized video stream management platform built on top of [Livepeer](https://livepeer.org/). Inspired by [StreamYard](https://streamyard.com/), this project replicates the core functionalities of StreamYard with added advantages of decentralization, scalability, and enhanced user control. Stream2Peer allows users to broadcast, record, and manage live streams seamlessly using the power of Web3 and Livepeer's open-source technology.

You can join our Discord [here](https://discord.gg/kqB9uqCQ).

## Code of Conduct

We are committed to fostering an open and welcoming environment. Please read our [Code of Conduct](./CODE_OF_CONDUCT.md) to understand the behavior we expect from our contributors and maintainers

## Features

- **Decentralized Streaming**: Stream2Peer uses the Livepeer protocol to deliver highly scalable and decentralized video streaming services.
- **Multiple Streaming Destinations**: Broadcast to multiple platforms like YouTube, Twitch, LinkedIn, and more simultaneously.
- **Customizable Layouts**: Flexible layout options for live streaming, allowing you to control how guests and shared media appear.
- **Multi-Guest Support**: Invite guests easily to join your live streams with a simple URL.
- **Recording and Playback**: Record live streams and provide playback options for your audience.
- **Browser-Based Streaming**: No additional downloads required; Stream2Peer operates entirely from the browser.
- **Chat and Audience Interaction**: Built-in tools for live chat and audience engagement.
- **Monorepo Setup**: Organize both frontend and backend codebases in a single repository using `pnpm` workspaces.

## Tech Stack

- **Frontend**: 
  - Framework: [React](https://react.dev/) with [Vite](https://vitejs.dev/) for a fast development environment.
  - UI: [TailwindCSS](https://tailwindcss.com/) for styling and flexibility in design.
  
- **Backend**:
  - Framework: [ExpressJS](https://expressjs.com/) for a scalable and robust server.
  - Database: [MySQL](https://www.mysql.com/) (or any SQL database you prefer).
  
- **Streaming & Transcoding**:
  - [Livepeer](https://livepeer.org/): Utilized for decentralized transcoding and media handling.
  
- **Monorepo Management**:
  - Managed with [pnpm](https://pnpm.io/) workspaces for streamlined dependency management and easy package sharing between the frontend and backend.

## Getting Started

### Prerequisites

Before you begin, ensure you have met the following requirements:

- [Node.js](https://nodejs.org/) v16+ installed
- [pnpm](https://pnpm.io/) installed globally
- MySQL database running

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/tobySolutions/stream2peer.git
   cd stream2peer
   ```

2. Install dependencies:

   ```bash
   pnpm install
   ```

4. Setup environment variables: Environment variables must be set up for both the `frontend` and `backend`. The environment variables are in a `env.example`.

6. Run the development server:

 - For backend: 

   ```bash
   pnpm dev:backend
   ```
- For frontend:
  ```bash
   pnpmm dev:frontend
  ```

### Project Structure

```bash
stream2peer/
│
├── packages/
│   ├── frontend/       # React with Vite (Client-side code)
│   └── backend/        # ExpressJS (Server-side code)
│
├── pnpm-workspace.yaml # pnpm workspace setup for monorepo
├── package.json        # Root package file
└── README.md           # Project documentation
```

### Backend API

The backend is powered by ExpressJs, and it handles stream creation, user management, and more. The API endpoints are RESTful and support integration with Livepeer’s transcoding API for video handling.

### Frontend

The frontend uses React and Vite, offering a fast and optimized development environment. 

## Contributing

Contributions make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**. Check out the [Contributing guide](https://github.com/tobySolutions/stream2peer/blob/main/CONTRIBUTING.md) to see how to set things up on your machine.

1. Fork the Project.
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`).
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`).
4. Push to the Branch (`git push origin feature/AmazingFeature`).
5. Open a Pull Request.

If you have any questions or need help with setup, you can join our Discord [here](https://discord.gg/kcqsbukZ).

## License

Distributed under the GPL 3.0 License. See [LICENSE](https://github.com/tobySolutions/stream2peer/blob/main/LICENSE) for more information.


## Roadmap

- Code refactoring for more optimizations
- UI migration to be heavy on Shadcn
- Single frontend deployment on Fleek
- Husky tests and CI workflows
- Creator program launch (Integrations with Livepeer tokens)


## Acknowledgements

- [Livepeer](https://livepeer.org/)
- [ExpressJs](https://expressjs.com/)
- [pnpm](https://pnpm.io/)
- [React](https://react.dev/)
- [Vite](https://vitejs.dev/)
- [shadcn-landing-page](https://github.com/leoMirandaa/shadcn-landing-page)


## Team Photo!!

![Emmanuel, Jumo and Tobiloba](https://pbs.twimg.com/media/GdeAtGTXYAENKsy?format=jpg&name=4096x4096)
