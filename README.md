# NHS Prototyping Kit
[![Deploy](https://www.herokucdn.com/deploy/button.png)](https://heroku.com/deploy)

Quickly create HTML prototypes of NHS services using the Nightingale framework

[![Known Vulnerabilities](https://snyk.io/test/github/nhsleadership/nhs-prototyping-kit/badge.svg)](https://snyk.io/test/github/nhsleadership/nhs-prototyping-kit)

# Introduction
The [NHS prototype kit](https://github.com/NHSLeadership/nhs-prototyping-kit/) provides a simple way to make interactive prototypes that look like NHS service pages (using the [Nightingale framework](https://github.com/NHSLeadership/nightingale)). These prototypes can be used to show ideas to people you work with, and to do user research.

## Installation instructions

This guide will walk you through installing and getting started with the prototyping kit.

You’ll use a copy of the kit for each new prototype app you want to make - they’re self contained.

Once installed, the kit uses about 100mb of your computer's disk space.

## Requirements

The prototyping kit runs on MacOS, Windows and Linux. Please make sure you've
got the following:

- Admin access to your machine
- Command line tools (Mac)
- Git bash (Windows)
- Git (Mac, Windows and Linux)
- Node.js 6.x.x
- A text editor (We recommend https://atom.io/)

## Terminal

You'll require the use of a terminal emulator. This is often called the 'command
line'. We'll need this to install, start and stop the kit.

### MacOS users

Your machine comes with the ```Terminal.app``` application. It's located within
the ```Utilities``` folder. You can also find it by pressing ```cmd + spacebar``` on your keyboard and typing `Terminal`.

#### Git

There are several ways to install Git on a Mac. If you've installed XCode (or it's Command Line Tools), Git may already be installed. To find out, open a terminal and enter

```git --version```

The response should be a `git version x.x.x`. If not, you may need to re-install XCode Command Line Tools with the `Terminal.app` command:

```xcode-select --install```


### Windows users

This guide will use Git Bash as a terminal instead of the existing CMD application. Git Bash is more fully featured and uses the same commands as Mac and Linux, so instructions in this guide work for all.

Installing git bash installs two things for you: a terminal (for entering commands), and git (used later to share your work with others).

#### Installing git bash
[Download Git bash](https://git-scm.com/download/win) (direct download).

Install with all default options.


## Node.js
### Check if you have Node.js

```node --version```

If the command says not found or doesn't return anything or says anything other
than 6.x.x LTS then you'll need to download the latest version.

## Install Node.js
Visit https://nodejs.org/en/ and download the LTS version. Run the installer
with the default options..

## Install command line tools
```xcode-select --install```

## Download the kit

If you want to get a copy of an existing code repository (from [github.com](https://github.com)) – the command you need is `git clone`.

To download the latest NHS Prototyping Kit:

Create a `projects` folder we will keep our prototype apps in:

Browse to your home directory with `cd` (change directory)

```cd ~```

Create a new directory using `mkdir` and name it `projects`

```mkdir projects```

change directory to the new `projects` folder

```cd projects```

Clone a copy of the latest NHS Prototyping Kit into a folder named `myNewProject` or somethnig else of your choosing

```git clone https://github.com/NHSLeadership/nhs-prototyping-kit.git myNewProject```

Change directory to the new folder

```cd myNewProject```

### Install the kit modules
The NHS Prototyping Kit relies on a number of open source code 'modules' others have created on the web. These need to be added into the app before it can be used. Install the required modules by typing

```npm install```

That's it. You should be all installed and ready to go!

### Run the kit
The NHS Prototyping Kit needs to be running each time you work on it or want to demonstrate your prototype. The kit will watch for changes you make to your prototype code and re-builds itself with each file you alter. To start the kit run

```npm start```

### Check it works

In your web browser, visit

[http://localhost:3000](http://localhost:3000)

You should see the prototype welcome page.

### To quit the kit

In terminal press the `ctrl` and `c` keys together. The Prototyping Kit will quit.

**Installation and first run complete!**

Congratulations!

---

Much of the work in this kit is repurposed with pride from the great work and support of [GDS](https://github.com/alphagov) coleagues [@joelanman](https://github.com/joelanman) and [@edwardhorsford](https://github.com/edwardhorsford) on https://github.com/alphagov/govuk_prototype_kit.
