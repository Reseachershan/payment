import { emptySplitApi } from './emptySplitApi'

export interface SignUpArgs {
  name: string
  email: string
  phone: string
  country: string
  password: string
  userRole: string
  longitude: any
  latitude: any
}

export interface LogInArgs {
  email: string
  password: string
}

export interface SocialAuthArgs {
  authProvider: string
  credentials: any
}

export interface EmailVerification {
  email: string
}

export interface OTPVerification {
  email: string
  otp: number
}

export interface UPDATEPROFILE {
  name: string
  country: string
  phone: string
}

export interface setAccessToken {
  publicToken: string
}
export interface TransferFunds {
  bankAccountId: number
  amount: string
}

export interface currencyConverter {
  amount: number
  from: string
  to: string
}

export interface AskQuestion {
  question: string
}

export interface ProfileImg {
  picture: Blob
}


export interface payaVendor {
  sender_id: number
  receiver_id: number
  amount: string
  original_amo: string
}

export const userApi = emptySplitApi.injectEndpoints({
  endpoints: (builder) => ({

    signUp: builder.mutation<any, SignUpArgs>({
      query: (args) => ({
        url: 'auth/register',
        method: 'POST',
        body: args
      })
    }),

    logIn: builder.mutation<any, LogInArgs>({
      query: (args) => ({
        url: 'auth/login',
        method: 'POST',
        body: args
      })
    }),

    socialAuth: builder.mutation<any, SocialAuthArgs>({
      query: (args) => ({
        url: `auth/social/${args.authProvider}`,
        method: 'POST',
        body: args.credentials
      })
    }),
    
    getTransaction: builder.query<any, void>({
      query: () => `transactions/`,
      providesTags: ['Transactions'],
    }),
    
    emailVerification: builder.mutation<any, EmailVerification>({
      query: (args) => ({
        url: `/auth/verify/email/`,
        method: 'POST',
        body: {email: args.email}
      })
    }),

    verifyOTP: builder.mutation<any, OTPVerification>({
      query: (args) => ({
        url: `/auth/verify/email/otp/`,
        method: 'POST',
        body: {
          email: args.email,
          otp: args.otp
        }
      })
    }),
    
    getWallet: builder.query<any, void>({
      query: () => `/wallet/`,
      providesTags: ['Banks','Transactions'],
    }),

    updateProfile: builder.mutation<any, UPDATEPROFILE>({
      query: (args) => ({
        url: `/auth/profile/`,
        method: 'PATCH',
        body: {
          name: args.name,
          country: args.country,
          phone: args.phone,
        }
      })
    }),

    getLinkToken: builder.query<any, void>({
      query: () => `/plaid/create_link_token/`,
    }),

    setAccessToken: builder.mutation<any, setAccessToken>({
      query: (args) => ({
        url: `/plaid/set_access_token/`,
        method: 'POST',
        body: {public_token: args.publicToken}
      }),
      invalidatesTags: ['Banks','Transactions'],
    }),
    
    getAccounts: builder.query<any, void>({
      query: () => `/plaid/accounts/`,
      providesTags: ['Banks','Transactions'],
    }),
    
    transferFunds: builder.mutation<any, TransferFunds>({
      query: (args) => ({
        url: `/plaid/transfer`,
        method: 'POST',
        body: {
          bankAccountId: args.bankAccountId,
          amount: args.amount
        }
      }),
      invalidatesTags: ['Transactions'],
    }),

    currencyConverter: builder.mutation<any, currencyConverter>({
      query: (args) => ({
        url: `/currency/coverter`,
        method: 'POST',
        body: {
          amount: args.amount,
          from: args.from,
          to: args.to,
        }
      }),
    }),

    
    askQuestion: builder.mutation<any, AskQuestion>({
      query: (args) => ({
        url: `/question`,
        method: 'POST',
        body: {
          question: args.question,
        }
      }),
    }),

    uploadProfileImg: builder.mutation<any, any>({
      query: (formData) => ({
        url: `/auth/profile-picture`,
        method: 'PATCH',
        body: formData,
      }),
    }),

    getStellarTransaction: builder.query<any, void>({
      query: () => `/get/stellar_transactions`,
    }),


    payaVendor: builder.mutation<any, payaVendor>({
      query: (data) => ({
        url: `/stellar_to_stellar`,
        method: 'POST',
        body: {
          sender_id: data.sender_id,
          receiver_id: data.receiver_id,
          amount: data.amount,
          original_amo: data.original_amo
        }
      }),
      invalidatesTags: ['Transactions']
    }),
  }),
  overrideExisting: true,
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useLogInMutation,
  useSignUpMutation,
  useSocialAuthMutation,
  useGetTransactionQuery,
  useEmailVerificationMutation,
  useVerifyOTPMutation,
  useGetWalletQuery,
  useUpdateProfileMutation,
  useGetLinkTokenQuery,
  useSetAccessTokenMutation,
  useGetAccountsQuery,
  useTransferFundsMutation,
  useCurrencyConverterMutation,
  useAskQuestionMutation,
  useUploadProfileImgMutation,
  usePayaVendorMutation,
  useGetStellarTransactionQuery,
} = userApi