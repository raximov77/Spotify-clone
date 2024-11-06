import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import SpotifyWebApi from 'spotify-web-api-node'
import { CLIENT_ID } from '../../hook/useEnv'
import { Context } from '../../context/Context'
import { LikeInner } from '../../assets/Icons'
import LoadingChart from "../../components/LoadingChart/LoadingChart"

function Single() {
  const {id} = useParams()
  const {token, setPLay, setPLaying} = useContext(Context)

  const spotifyApi = new SpotifyWebApi({
    clientId:CLIENT_ID
  })

  useEffect(() => {
    if(!token) return;
    spotifyApi.setAccessToken(token)
  }, [token, id])

  const [trackInfo, setTrackInfo] = useState({})
  const [artistTracks, setArtistTracks] = useState([])
  useEffect(() => {
    if(token && id){
      spotifyApi.getTrack(id).then(res => {
        const data = {
          artistName:res.body.artists[0].name,
          trackName:res.body.name,
          img:res.body.album.images[0].url,
          time:String(((res.body.duration_ms / 1000) / 60).toFixed(2)).split(".").join(":")
        }
        setTrackInfo(data)
        spotifyApi.searchTracks(res.body.artists[0].name).then(res => {
          setArtistTracks(res.body.tracks.items.map(item => {
            const data = {
              id:item.id,
              img:item.album.images[0].url,
              trackName:item.name,
              artistName:item.artists[0].name,
              uri:item.uri,
              albumName:item.album.name,
              time:"2:45",
              isLiked:false,
              isPlaying:false
            }
            return data
          }))
        })
      })
    }
  }, [token])

  function handleTrackClick(item, evt){
    if(evt.target.id == "like"){
      item.isLiked = !item.isLiked
      setArtistTracks([...artistTracks])
    }
    else{
      artistTracks.filter(item => item.isPlaying = false)
      setPLay(item.uri)
      setPLaying(true)
      item.isPlaying = !item.isPlaying
      setArtistTracks([...artistTracks])
    }
  }

  return (
    <div className='p-5 music-single overflow-y-auto'>
      <div className='flex items-center space-x-8'>
        <img className='h-[297px] rounded-md' src={trackInfo.img} alt="Track img" width={297} height={297} />
        <div>
          <p className='text-[22px] font-bold text-white'>{trackInfo.artistName}</p>
          <h2 className='texxt-[80px] text-white font-bold'>{trackInfo.trackName}</h2>
          <strong className='text-white font-semibold text-[20px]'>{trackInfo.time}</strong>
        </div>
      </div>
    <table className='w-full mt-[30px]'>
        <thead>
          <tr className='border-b-[2px] border-[#B3B3B3]'>
            <th className='text-[#B3B3B3] text-[20px] py-2'>#</th>
            <th className='text-[#B3B3B3] text-start px-3 text-[20px] py-2'>TITLE</th>
            <th className='text-[#B3B3B3] text-start text-[20px] py-2'>ALBUM</th>
            <th className='text-[#B3B3B3] text-[20px] py-2'>DATE ADDED</th>
            <th className='text-[#B3B3B3] text-[20px] py-2'>Time</th>
          </tr>
        </thead>
        <tbody>
          {artistTracks.map((item, index) => (
            <tr onClick={(evt) => handleTrackClick(item, evt)} className='cursor-pointer' key={item.id}>
              <td className='text-white text-[18px] p-3'>
                {item.isPlaying ? <LoadingChart/> : index +1}
              </td>
              <td className='p-3'>
                <div className='flex items-center space-x-[21px]'>
                  <img src={item.img} alt="Img" width={52} height={52} />
                  <div>
                    <p className={`text-[22px font-semibold ${item.isPlaying ? "text-green-500" : "text-white"}`}>{item.trackName}</p>
                    <p className='text-[18px] text-[#B3B3B3]'>{item.artistName}</p>
                  </div>
                </div>
              </td>
              <td className='p-3 text-[18px] text-white text-start'>{item.albumName}</td>
              <td></td>
              <td className='p-3 space-x-[34px] flex items-center text-end'>
                <button id='like' className={`${item.isLiked ? "text-green-400" : "text-white"}`}>
                  <LikeInner/>
                </button>
                <p className='text-white text-[20px]'>{item.time}</p>
              </td>
            </tr>
          ))}
        </tbody>
    </table>
    </div>
  )
}

export default Single