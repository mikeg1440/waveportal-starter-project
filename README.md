<!--
*** To avoid retyping too much info. Do a search and replace for the following:
*** github_username, repo, twitter_handle, email
-->





<!-- PROJECT SHIELDS -->
<!--
*** I'm using markdown "reference style" links for readability.
*** Reference links are enclosed in brackets [ ] instead of parentheses ( ).
*** See the bottom of this document for the declaration of the reference variables
*** for contributors-url, forks-url, etc. This is an optional, concise syntax you may use.
*** https://www.markdownguide.org/basic-syntax/#reference-style-links
-->
[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]
[![LinkedIn][linkedin-shield]][linkedin-url]



<!-- PROJECT LOGO -->
<br />
<p align="center">
  <a href="https://github.com/mikeg1440/waveportal-starter-project.git">
    <img src="src/images/waving_hand.gif" alt="Waving hand" width="200" height="200">
  </a>

  <h3 align="center">Cyber Wave Portal</h3>

  <p align="center">
    A simple DApp built with React.js and ethers.js that allows users to wave at a personal address and send a message.  Each person who waves gets a chance to win some ether when they wave, each individual can win up to 3 times.  Waving is not limited at this point but may be in the future if there is widespread abuse.
    <br />
    <a href="https://github.com/mikeg1440/waveportal-starter-project.git"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <a href="https://github.com/mikeg1440/waveportal-starter-project.git">View Demo</a>
    ·
    <a href="https://github.com/mikeg1440/waveportal-starter-project.git/issues">Report Bug</a>
    ·
    <a href="https://github.com/mikeg1440/waveportal-starter-project.git/issues">Request Feature</a>
  </p>
</p>



<!-- TABLE OF CONTENTS -->
## Table of Contents

* [About the Project](#about-the-project)
  * [Built With](#built-with)
* [Getting Started](#getting-started)
  * [Prerequisites](#prerequisites)
  * [Installation](#installation)
* [Usage](#usage)
* [Roadmap](#roadmap)
* [Contributing](#contributing)
* [License](#license)
* [Contact](#contact)
* [Acknowledgements](#acknowledgements)



<!-- ABOUT THE PROJECT -->
## About The Project

[![Demo Animation][product-screenshot]](https://github.com/mikeg1440/waveportal-starter-project.git)

### Built With

* [React.js](https://reactjs.org)
* [ethers.js](https://docs.ethers.io/v5/)
* [Hardhat](https://hardhat.org/)
* [MUI](https://mui.com/)



<!-- GETTING STARTED -->
## Getting Started Dev

To get a local copy up and running follow these simple steps.

### Prerequisites

This is an example of how to list things you need to use the software and how to install them.
* npm
```sh
npm install npm@latest -g
```

### Installation
 
1. Clone the repo
```sh
git clone https://github.com/mikeg1440/waveportal-starter-project.git
```
2. To install packages you can use yarn or npm

`yarn i`

`npm i`

3. Compile the contract and get artifact file 

The contract for this app is [here](https://github.com/mikeg1440/WavePortalContract.git)

Clone that repo `git clone git@github.com:mikeg1440/WavePortalContract.git` and `cd WavePortalContract`

Run package installer (yarn/npm)

`yarn i`
`npm i`

Compile the contract and deploy to testnet with hardhat (Rinkeby)

`npx hardhat run scripts/deploy.js --network rinkeby`

**Save the contract address that gets printed to the console after running the deploy script, need to update the DApp

Overwrite the content from `artifacts/contracts/WavePortal.sol/WavePortal.json` to the `src/utils/WavePortal.json` file

4. Update the DApp with new contract address

Open `src/App.js` in the `waveportal-starter-project` and replace the `contractAddress` variable with the new address we copied previously

5. Run the server

`yarn start`

<!-- USAGE EXAMPLES -->
## Usage

Use this space to show useful examples of how a project can be used. Additional screenshots, code examples and demos work well in this space. You may also link to more resources.

_For more examples, please refer to the [Documentation](https://example.com)_



<!-- ROADMAP -->
## Roadmap

See the [open issues](https://github.com/mikeg1440/repo/issues) for a list of proposed features (and known issues).



<!-- CONTRIBUTING -->
## Contributing

Contributions are what make the open source community such an amazing place to be learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request



<!-- LICENSE -->
## License

Distributed under the MIT License. See `LICENSE` for more information.



<!-- CONTACT -->
## Contact

Your Name - [@twitter_handle](https://twitter.com/twitter_handle) - email

Project Link: [https://github.com/mikeg1440/waveportal-starter-project](https://github.com/mikeg1440/waveportal-starter-project)



<!-- ACKNOWLEDGEMENTS -->
## Acknowledgements

* []()
* []()
* []()





<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[contributors-shield]: https://img.shields.io/github/contributors/othneildrew/Best-README-Template.svg?style=flat-square
[contributors-url]: https://github.com/mikeg1440/waveportal-starter-project/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/othneildrew/Best-README-Template.svg?style=flat-square
[forks-url]: https://github.com/mikeg1440/waveportal-starter-project/network/members
[stars-shield]: https://img.shields.io/github/stars/othneildrew/Best-README-Template.svg?style=flat-square
[stars-url]: https://github.com/mikeg1440/waveportal-starter-project/stargazers
[issues-shield]: https://img.shields.io/github/issues/othneildrew/Best-README-Template.svg?style=flat-square
[issues-url]: https://github.com/mikeg1440/waveportal-starter-project/issues
[license-shield]: https://img.shields.io/github/license/othneildrew/Best-README-Template.svg?style=flat-square
[license-url]: https://github.com/mikeg1440/waveportal-starter-project/blob/master/LICENSE.txt
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=flat-square&logo=linkedin&colorB=555
[linkedin-url]: https://linkedin.com/in/
[product-screenshot]: assets/WavePortalDemo.gif