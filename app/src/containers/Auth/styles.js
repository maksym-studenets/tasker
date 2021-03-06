const styles = theme => ({
    card: {
        padding: theme.spacing.unit * 3,
        margin: `150px 15%`,
        [theme.breakpoints.down('xs')]: {
            margin: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 2}px`,
        },
        maxWidth: 700
    },
    title: {
        textAlign: 'center'
    },
    button: {
        margin: `0 0 ${theme.spacing.unit * 2}px`,
    },
    input: {
        marginTop: theme.spacing.unit * 2,
        marginBottom: theme.spacing.unit * 2
    }
});

export default styles;