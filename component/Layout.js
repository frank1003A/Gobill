import React from 'react'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Appbar from './Appbar'
import Sidebar from './Sidebar'

export default function Layout({children, mTop, mLeft}) {
  return (
    <div>
        <Head>
        <title>Gobill</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Appbar/>
      <Sidebar/>
      <div style={{minHeight: '80vh', height: '100vh', marginTop: `${mTop}`, marginLeft:`${mLeft}`}}>
          {children}
      </div>
      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
      
    </div>
  )
}


/**
 <Container sx={{minHeight: '80vh',  marginTop: `${mTop}`, marginLeft:`${mLeft}`}}>
          {children}
      </Container>

            <AppBar position='fixed' sx={{backgroundColor: '#fff'}} id='muibar'>
          <Toolbar>
              <Typography sx={{color: '#002244', marginRight: '10px', fontWeight:'bold', fontSize: '600' }}>
                  Gobill
              </Typography>
              <Typography sx={{color: '#002244', marginRight: '10px', fontWeight:'bold', fontSize: '600' }}>
                  Something
              </Typography>
              <Typography sx={{color: '#002244', marginRight: '10px', fontWeight:'bold', fontSize: '600' }}>
              Something
              </Typography>
              <Typography sx={{color: '#002244', marginRight: '10px', fontWeight:'bold', fontSize: '600' }}>
              Something
              </Typography>
             <Button variant='contained' sx={{background: '#002244'}}>Login</Button>
          </Toolbar>
      </AppBar>
 */