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


 export default [{
     path: '/',
     component: Index
     /*
     routes: [{
         path: '/',
         exact: true
     }]
     */
 }]