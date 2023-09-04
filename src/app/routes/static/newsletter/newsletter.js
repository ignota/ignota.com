import {
  Form,
  Root,
  Wrapper,
} from './styled-newsletter'
import React, { PureComponent } from 'react'
import TextField, { HelperText, TextFieldAdornment } from 'app/components/text-field'
import { actions } from 'app/flux'
import Button from 'app/components/button'
import { connect } from 'react-redux'
import FormControl from 'app/components/form-control'
import Heading from 'app/components/heading'
import Link from 'app/components/link'
import MainToolbar from 'app/components/main-toolbar'
import Paragraph from 'app/components/paragraph'
import { SendIcon } from 'mdi-react'

@connect(
  state => ({
    error: state.social.error,
    loading: state.social.loading,
  }),
  { onSubscribeToNewsletter: actions.social.subscribeToNewsletter },
)
class Newsletter extends PureComponent {
  state = {
    email: '',
  }

  handleChange(e) {
    this.setState({ email: e.target.value })
  }

  handleSubmit(e) {
    e.preventDefault()
    this.props.onSubscribeToNewsletter(this.state.email)
    this.setState({ email: '' })
  }

  render() {
    const {
      error,
      loading,
    } = this.props
    const { email } = this.state

    return (
      <>
        <MainToolbar />
        <Root>
          <Wrapper>
            <Heading size={ 3 }>
              Join the Ignotae.
            </Heading>
            <Paragraph>
              Add your e-mail address to our mailing list if you’d like to receive
              occasional updates about new posts, new features, and other Ignota
              goings-on.
            </Paragraph>
            <Paragraph>
              We’ve got too much class to spam you or sell your information. If
              you’d like some more reassurance, take a gander at
              our <Link to='/terms'>terms</Link>.
            </Paragraph>
            <Form onSubmit={ this.handleSubmit }>
              <FormControl required error={ !!error }>
                <TextField
                  fullWidth
                  color='primary'
                  disabled={ !!error || loading }
                  label='E-mail address'
                  placeholder='oscar@wil.de'
                  startAdornment={
                    <TextFieldAdornment><SendIcon /></TextFieldAdornment>
                  }
                  value={ email }
                  onChange={ this.handleChange } />
                <HelperText persistent={ !!error }>Sorry, that didn’t quite work. Please try again later.</HelperText>
              </FormControl>
              <Button color='primary' disabled={ !email || !!error || loading } onClick={ this.handleSubmit }>Ignotae Assemble</Button>
            </Form>
          </Wrapper>
        </Root>
      </>
    )
  }
}

export default Newsletter
