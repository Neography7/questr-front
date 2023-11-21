import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import QuestionService from '../services/question.service';

// UnansweredsState Interface
export interface UnansweredsState {
    count: number,
    page: number,
    totalPage: number,
    questions: Array<{
        userID: string;
        anonymous: boolean;
        question: string;
        answer: string | null;
        from: {
            username: string;
            nickname: string;
            avatar: string;
        } | null;
        createdAt: string;
    }>,
    pending: boolean
}

// Initial State
const initialState: UnansweredsState = {
    count: 0,
    page: 0,
    totalPage: 0,
    questions: [],
    pending: false
}

// getQuestions
export const getQuestions = createAsyncThunk(
    'unanswereds/getQuestions',
    async (_, thunkAPI) => {

        const { unanswereds } = thunkAPI.getState() as { unanswereds: UnansweredsState };

        if (unanswereds.totalPage !== 0 && unanswereds.totalPage <= unanswereds.page)
            return thunkAPI.rejectWithValue({ error: true });
            
        let page = unanswereds.page

        try {

            page++;

            const response = await QuestionService.getUnansweredQuestion(page);

            return response;

        } catch (error) {

            console.log("aaaa")
            return thunkAPI.rejectWithValue({ error: true });

        }

    }
)

// Slice
const unansweredsSlice = createSlice({
    name: 'unanswereds',
    initialState,
    reducers: {
        setCount: (state, action) => {
            state.count = action.payload;
        },
        increateCount: (state) => {
            state.count++;
        },
        decreaseCount: (state) => {
            state.count--;
        },
        setPage: (state, action) => {
            state.page = action.payload;
        },
        addQuestion: (state, action) => {
            const question = action.payload;
            state.questions.unshift(question);
            state.count = state.count + 1;
        },
        removeQuestion: (state, action) => {
            const removedQuestion = action.payload;
            const filteredQuestions = state.questions.filter((question: any) => question._id !== removedQuestion._id);
            state.questions = filteredQuestions;
            state.count = state.count - 1;
        }
    },
    extraReducers: (builder) => {
        // Add reducers for additional action types here, and handle loading state as needed
        builder.addCase(getQuestions.pending, (state) => {
            state.pending = true;
        }),
        builder.addCase(getQuestions.rejected, (state, action) => {
            console.log(action.payload)
            state.pending = false;
            console.log("Error on getting unanswered questions");
        }),
        builder.addCase(getQuestions.fulfilled, (state, action) => {
            const questions = action.payload.questions;
            const totalRecords = action.payload.totalRecords;
            const totalPage = action.payload.totalPage;
            const page = action.payload.currentPage;

            if (questions) {

                if (state.count == 0) 
                    state.count = totalRecords;

                state.pending = false;

                state.page = page;
                state.totalPage = totalPage ?? 1;
                
                const filteredNewQuestions = questions.filter((newQuestion: any) => !state.questions.some((existingQuestion: any) => existingQuestion._id === newQuestion._id));
                state.questions.push(...filteredNewQuestions);
            } 
        })
    },
});

export const { setCount, setPage, addQuestion, removeQuestion } = unansweredsSlice.actions;

export default unansweredsSlice.reducer