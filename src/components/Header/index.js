import React from 'react'
  import TMDBLogo from '../../images/tmdb_logo.svg'
  import { Wrapper, Content, Head, TMDBLogoImg } from './Header.styles'
  
const Header =()=>(
    <Wrapper>
        <Content>
           <Head><h1>DECAmovies</h1></Head>
           <TMDBLogoImg src={TMDBLogo} alt ="Tmdb-logo"/>
        </Content>
    </Wrapper>
)

export default Header

