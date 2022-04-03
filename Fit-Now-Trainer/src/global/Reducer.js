export const INITIAL_STATE = {
    darkMode:false,
    login:false,
    user: {
        id:"",
        name:"",
        email:"",
        age: "",
        gender:'',
        phno:'',
        city:'',
        pic:'',
        spec:"",
        like:0,
        dislike:0
    },
    signin: false,
    register: false
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
                city:action.user.city,
                pic:action.user.photo,
                spec:action.user.specialization,
                like:action.user.likes,
                dislike:action.user.dislikes
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
}