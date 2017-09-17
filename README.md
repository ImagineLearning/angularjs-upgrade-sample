# AngularJS Upgrade Sample

This is a basic AngularJS application to be used with testing partial upgrades by including components written with other frameworks, such as Angular or React.

## Setup

### Node

This project requires Node v6 or greater. Node Version Manager (nvm) is recommended over simply installing Node, since it allows you to easily switch between
versions of Node without having to uninstall previous versions.

#### Windows

Download and run installer from https://github.com/coreybutler/nvm-windows/releases​​.

Run the following commands in the command prompt:
```
nvm install 6.11.2
nvm use 6.11.2
```

#### Mac

Run the following commands in the terminal:
```
curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.4/install.sh | bash
nvm install 6.11.2
nvm use 6.11.2
```
See https://github.com/creationix/nvm for more information on NVM.

### Install Dependencies

Run the following commands in the terminal/command prompt from the project directory:
```
npm install -g gulp-cli
npm install
```

## Run Application

### Build

```
gulp
```

### Start Development Web Server

```
npm start
```

### Tests

```
gulp test
```
