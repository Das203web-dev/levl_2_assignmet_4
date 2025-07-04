// import type { IBooks } from '@/type/type'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
// import { url } from 'inspector'

export const baseApi = createApi({
    reducerPath: "baseApi",
    baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000/api" }),
    tagTypes: ["books", "borrowBooks"],
    endpoints: (builder) => ({
        getBooks: builder.query({
            query: () => "/books",
            providesTags: ["books"]
        }),
        getSingleBook: builder.query({
            query: (id: string) => `/books/${id}`
        }),
        createBook: builder.mutation({
            query: (bookData) => ({
                url: "/books",
                method: "POST",
                body: bookData
            }),
            invalidatesTags: ["books"]
        }),
        deleteBook: builder.mutation({
            query: (id: string) => ({
                url: `/books/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["books", "borrowBooks"]
        }),
        editBook: builder.mutation({
            query: (book) => ({
                url: `/books/${book.id}`,
                method: "PUT",
                body: book
            }),
            invalidatesTags: ["books"]
        }),
        borrowSummary: builder.query({
            query: () => "/borrow",
            providesTags: ["borrowBooks"]
        }),
        borrowBook: builder.mutation({
            query: (book) => ({
                url: `/borrow`,
                method: "POST",
                body: book
            }),
            invalidatesTags: ["books", "borrowBooks"]
        })
    })
})
export const { useGetBooksQuery, useGetSingleBookQuery, useCreateBookMutation, useDeleteBookMutation, useEditBookMutation, useBorrowBookMutation, useBorrowSummaryQuery } = baseApi

// useEditBookMutation