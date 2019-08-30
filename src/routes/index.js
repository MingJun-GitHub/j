/**
 * 路由
 */

 import React , {lazy, Suspense} from 'react'
 
 const IndexComponent = lazy(() => import('@/pages/index'))
 const Index = (props) => {
     return <Suspense fallback={null}>
         <IndexComponent {...props} />
     </Suspense>
 } 



 const SearchComponent = lazy(() => import('@/pages/search'))
 const Search = (props) => {
     return <Suspense fallback={null}>
     <SearchComponent {...props} />
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
 }]