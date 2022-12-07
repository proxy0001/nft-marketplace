import { Reducer } from "react"

type Processor<S, P> = (state: S, payload: P) => S
type Call<T, S, P> = (type: T) => Processor<S, P>
type Actions = {
  [key in any]: Processor<StatusState, StatusPayload>
}
type Caller<T, S, P> = { call: Call<T, S, P>}

const appendCaller = <A extends Actions>(obj: A) => {
  return Object.assign(obj, {
    call: (type: string): Function => {
      if (obj === undefined) throw new Error('can not call function with this')
      const callable = typeof obj![type as keyof typeof obj] === 'function'
      const hasDefault = typeof obj!['DEFAULT' as keyof typeof obj] === 'function'
      if (!callable && !hasDefault) throw new Error('there is no fn or default fn can be called.')
      if (!callable && hasDefault) return obj!['DEFAULT' as keyof typeof obj]
      return obj![type as keyof typeof obj]
    }
  })
}

export enum StatusActionType {
  UPDATE = 'UPDATE',
  DEFAULT = 'DEFAULT',
}

export interface StatusPayload {
  isLoading?: boolean,
  isError?: boolean,
  isSuccess?: boolean,
  isUpdated?: boolean,
}

export interface StatusState {
  isLoading: boolean,
  isError: boolean,
  isSuccess: boolean,
  isUpdated: boolean,
}

export  interface StatusAction {
  type: StatusActionType
  payload: StatusPayload
}

type StatusActions = {
  [key in StatusActionType]: Processor<StatusState, StatusPayload>
} & Caller<StatusActionType, StatusState, StatusPayload>

const statusActions: StatusActions = appendCaller({
  [StatusActionType.UPDATE]: (state, payload) => {
    return { ...state, ...payload }
  },
  [StatusActionType.DEFAULT] (state, payload) {
    return { ...state }
  },
}) as StatusActions

export const statusReducer: Reducer<StatusState, StatusAction> = (state, action) => {
  return statusActions.call(action.type)(state, action.payload)
}