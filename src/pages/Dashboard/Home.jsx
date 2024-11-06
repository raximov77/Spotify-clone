import React, { lazy, Suspense, useContext, useEffect, useState } from 'react'
import { Context } from '../../context/Context'
import Loading from "../../assets/images/Loading.png"
import SpotifyWebApi from 'spotify-web-api-node'
import { CLIENT_ID } from '../../hook/useEnv'

const MusicLists = lazy(() => new Promise((resolve) => {
  return setTimeout(() => resolve(import("../../components/MusicLists")), 800)
}))

function Home() {
  const {token} = useContext(Context)
  const spotifyApi = new SpotifyWebApi({
    clientId:CLIENT_ID
  })

  const [trendMusicList, setTrendMusicList] = useState([])
  
  useEffect(() => {
    if(!token) return;
    spotifyApi.setAccessToken(token)
  }, [token])

  useEffect(() => {
    if(token){
      spotifyApi.searchAlbums("Jahongir Otajonov").then(res => {
        setTrendMusicList(res.body.albums.items.splice(0, 6).map(item => {
          const data = {
            id:item.id,
            img:item.images[0].url,
            trackName:item.name,
            artistName:item.artists[0].name,
            uri:item.uri
          }
          return data
        }))   
      })
    }
  }, [token])
  
  return (
    <Suspense fallback={<img className='absolute inset-0 m-auto' src={Loading} alt='Loading' width={100} height={100}/>}>
      <div className='p-5'>
        <h2 className='text-[39px] mb-[29px] text-white font-bold'>Good afternoon</h2>
        <ul className='flex mb-[50px] gap-4 flex-wrap justify-between'>
            {trendMusicList.map(item => (
              <li className='flex trends-item overflow-hidden rounded-[6px] w-[48%] items-center space-x-[21px]' key={item.id}>
                <img className='h-[82px] rounded-[6px]' src={item.img} alt="Trend img"  width={82} height={82}/>
                <h2 className='font-bold text-white text-[20px]'>{item.trackName}</h2>
              </li>
            ))}
        </ul>
        <div className='space-y-[50px]'>          
            <MusicLists artistName={"Sherali Jo'rayev"}/>
            <MusicLists artistName={"Botir Qodirov"}/>
            <MusicLists artistName={"Shoxjahon Jo'rayev"}/>
            <MusicLists artistName={"Zohirshoh Jo'rayev"}/>
        </div>
      </div>
    </Suspense>
  )
}

export default Home