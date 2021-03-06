import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/es/Card/Card';
import Typography from '@material-ui/core/es/Typography/Typography';
import Button from '@material-ui/core/es/Button/Button';
import { ValidatorForm, TextValidator} from 'react-material-ui-form-validator';
import Grid from '@material-ui/core/Grid';
import withUser from '../../hocs/withUser'
import FileUploadButton from '../../components/FileUploadButton';
import { addTask } from '../../services/tasks.service';
import withLoading from '../../hocs/withLoading';
import withNotifications from '../../hocs/withNotifications';
import withTitle from '../../hocs/withTitle';
import withPageTitle from '../../hocs/withPageTitle';

const styles = theme => ({
    card: {
        padding: theme.spacing.unit * 3,
        margin: `${theme.spacing.unit * 5}px 15%`,
        [theme.breakpoints.down('xs')]: {
            margin: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 2}px`,
        },
        maxWidth: 700,
        minWidth: 400
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

class TaskForm extends React.Component {
    state = {
        form: {
            name: '',
            file: null
        },
        error: null
    };

    onSubmit = async () => {
        try {
            const { sprintId } = this.props.match.params;
            this.props.showProgress();
            await addTask(sprintId, this.state.form);
            this.props.showSuccessNotification('You have added a task');
            window.history.back();
        } catch (e) {
            this.props.showErrorNotification('Failed to add a task');
        } finally {
            this.props.hideProgress();
        }
    };

    handleChange = (event) => {
        const { form } = this.state;
        form[event.target.name] = event.target.value;
        this.setState({ form });
    };

    render() {
        const { classes } = this.props;
        return (
            <Grid
                container
                direction='row'
                justify='center'
            >
                <Card className={classes.card}>
                    <Typography
                        className={classes.title}
                        variant='display1'
                    >
                        Task Form
                    </Typography>
                    <ValidatorForm onSubmit={this.onSubmit}>
                        <TextValidator
                            validators={['required']}
                            errorMessages={['This field is required']}
                            required
                            fullWidth
                            type='text'
                            placeholder='Name'
                            name='name'
                            value={this.state.form.name}
                            onChange={this.handleChange}
                            className={classes.input}
                        />
                        <FileUploadButton name='file' onChange={this.handleChange}/>
                        <div className='error'>{ this.state.error }</div>
                        <Button
                            type='submit'
                            color='primary'
                            variant='contained'
                            className={classes.button}
                            fullWidth
                        >
                            Add Task
                        </Button>
                    </ValidatorForm>
                </Card>
            </Grid>
        )
    }

    static propTypes = {
        classes: PropTypes.object.isRequired
    }
}


export default withTitle(withPageTitle(withNotifications(withLoading(withUser(withStyles(styles)(TaskForm))))));




