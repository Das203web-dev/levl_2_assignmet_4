import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
export const baseApi = createApi({
    reducerPath: "baseApi",
    baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000/" }),
    // baseQuery: fetchBaseQuery({ baseUrl: "https://level-2-assignment-3-6lyx.onrender.com/" }),
    tagTypes: ["books", "borrowBooks"],
    endpoints: (builder) => ({
        getBooks: builder.query({
            query: () => "api/books",
            providesTags: ["books"]
        }),
        getSingleBook: builder.query({
            query: (id: string) => `api/books/${id}`
        }),
        createBook: builder.mutation({
            query: (bookData) => ({
                url: "api/books",
                method: "POST",
                body: bookData
            }),
            invalidatesTags: ["books"]
        }),
        deleteBook: builder.mutation({
            query: (id: string) => ({
                url: `api/books/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["books", "borrowBooks"]
        }),
        editBook: builder.mutation({
            query: (book) => ({
                url: `api/books/${book.id}`,
                method: "PUT",
                body: book
            }),
            invalidatesTags: ["books"]
        }),
        borrowSummary: builder.query({
            query: () => "api/borrow",
            providesTags: ["borrowBooks"]
        }),
        borrowBook: builder.mutation({
            query: (book) => ({
                url: `api/borrow`,
                method: "POST",
                body: book
            }),
            invalidatesTags: ["books", "borrowBooks"]
        })
    })
})
export const { useGetBooksQuery, useGetSingleBookQuery, useCreateBookMutation, useDeleteBookMutation, useEditBookMutation, useBorrowBookMutation, useBorrowSummaryQuery } = baseApi

