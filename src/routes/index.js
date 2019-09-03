/**
 * 路由
 */

 import React , {lazy, Suspense} from 'react'
 
 /**
  * 首页
  */
 const IndexComponent = lazy(() => import('@/pages/index'))
 const Index = (props) => {
     return <Suspense fallback={null}>
         <IndexComponent {...props} />
     </Suspense>
 } 

 /**
  * 搜索
  */
 const SearchComponent = lazy(() => import('@/pages/search'))
 const Search = (props) => {
     return <Suspense fallback={null}>
     <SearchComponent {...props} />
 </Suspense>
 } 


 const ArtistComponent = lazy(() => import('@/pages/artist'))
 const Artist = (props) => {
     return <Suspense fallback={null}>
     <ArtistComponent {...props} />
 </Suspense>
 } 

 /**
  * Song歌曲
  */
 const SongComponent = lazy(() => import('@/pages/song'))
 const Song = (props) => {
     return <Suspense fallback={null}>
     <SongComponent {...props} />
 </Suspense>
 } 

/**routes: [{
         path: '/',
         exact: true
     }] */
 export default [{
     path: '/',
     component: Index,
     exact: true  
 }, {
     path: '/search', 
     component: Search
 }, {
     path: '/artist/:id',
     component: Artist
 }, {
    path: '/song/:id',
    component: Song
}]