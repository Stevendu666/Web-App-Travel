import { makeStyles } from "@material-ui/core";

export default makeStyles(() => ({
    appBar: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderRadius: '30px',
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        borderRadius: '40px',
        paddingLeft: '20px',
        paddingRight: '20px'
    },
    home: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center'
    },
    button: {
        color: 'white',
    },
}));