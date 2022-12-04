/**
 * ref: https://javascript.plainenglish.io/how-to-solve-hydration-error-in-next-js-a50ec54bfc02
 */

import dynamic from 'next/dynamic'
import {Fragment, PropsWithChildren} from 'react'

const NoSSR = (props: PropsWithChildren) => <Fragment>{props.children}</Fragment>

export default dynamic(() => Promise.resolve(NoSSR), {
    ssr: false
})