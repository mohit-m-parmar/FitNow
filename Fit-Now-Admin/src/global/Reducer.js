export const INITIAL_STATE = {
    id:"",
    darkMode:false,
    login:false,
    user: {
        id:"",
        name:"",
        email:""
    },
    signin: false,
    register: false,
    trainers: []
};

export const reducer = (state,action) => {
    switch(action.type){
        case 'TOGGLE_THEME': return {
            ...state,
            darkMode: !state.darkMode
        };
        case 'SET_USER': return {
            ...state,
            user: {
                id:action.user._id,
                name:action.user.name,
                email:action.user.email,
                age: action.user.age,
                gender:action.user.gender,
                phno:action.user.ph_no,
                pref:action.user.pref,
            }
        };
        case 'LOGIN': return {
            ...state,
            login: true,
            signin: false,
            register: false
        };
        case 'LOGOUT': return {
            ...state,
            login: false,
            user: INITIAL_STATE.user
        };
        case 'TOGGLE_SIGNIN': return {
            ...state,
            signin: !state.signin,  
        };
        case 'TOGGLE_REGISTER': return {
            ...state,
            register: !state.register,
            signin: false
        };
        case 'SET_TRAINERS': return {
            ...state,
            trainers: action.trainers
        };
        case 'SET_ID': return {
            ...state,
            id: action.id
        };
        default: return state;
    }
};

export const toggleTheme = () => {
    return {
        type: 'TOGGLE_THEME'
    }
};

export const signIn = () => {
    return {
        type: 'LOGIN',
        user: ""
    }
};

export const signOut = () => {
    return {
        type: 'LOGOUT'
    }
};

export const toggleSI = () => {
    return {
        type: 'TOGGLE_SIGNIN'
    }
};

export const toggleReg = () => {
    return {
        type: 'TOGGLE_REGISTER'
    }
};

export const setUser = (data) => {
    return {
        type: 'SET_USER',
        user: data
    }
};

export const setTrainers = (data) => {
    return {
        type: 'SET_TRAINERS',
        trainers: data
    }
};

export const setId = (data) => {
    return {
        type: 'SET_ID',
        id: data
    }
};