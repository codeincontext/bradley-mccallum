import { Component } from 'react';
import jsonp from 'jsonp';

import Container from '~/components/Container';
import {
  colors,
  spacing,
  fonts,
  weights,
  letterSpacing,
  CONTENT_ITEM_SPACING,
  lineHeights,
} from '~/lib/theme';

// Based on https://github.com/revolunet/react-mailchimp-subscribe

// TODO: Designs also have first and last name fields.
// Those map to FNAME and LNAME in a form

const SENDING = 'sending';
const SUCCESS = 'success';
const ERROR = 'error';

const ACTION =
  '//conjunctionarts.us10.list-manage.com/subscribe/post?u=a4b33096c25885556bd9bd4f0&id=877be2f315';

const getAjaxUrl = url => url.replace('/post?', '/post-json?');

class SubscribeForm extends Component {
  state = { status: null, msg: null };
  input = null;

  onSubmit = e => {
    e.preventDefault();

    const isInvalid =
      !this.input.value ||
      this.input.value.length < 5 ||
      !this.input.value.includes('@');

    if (isInvalid) {
      this.setState({ status: ERROR });
      return;
    }

    this.setState({ status: SENDING, msg: null }, this.submit);
  };

  submit = () => {
    const email = encodeURIComponent(this.input.value);
    const url = `${getAjaxUrl(ACTION)}&EMAIL=${email}`;

    jsonp(url, { param: 'c' }, (err, data) => {
      if (err) {
        this.setState({ status: ERROR, msg: err });
      } else if (data.result !== 'success') {
        this.setState({ status: ERROR, msg: data.msg });
      } else {
        this.setState({ status: SUCCESS, msg: data.msg });
      }
    });
  };

  render() {
    const { status } = this.state;

    return (
      <Container>
        <div className="root">
          <form action={ACTION} method="post" noValidate>
            <label htmlFor="email">Email Address</label>
            <div className="fields">
              <input
                ref={node => (this.input = node)}
                type="email"
                defaultValue=""
                name="EMAIL"
                required={true}
              />

              <button
                disabled={status === SENDING || status === SUCCESS}
                onClick={this.onSubmit}
                type="submit"
              >
                Subscribe
              </button>
            </div>

            <p className="message">
              {status === SENDING && 'Subscribing...'}
              {status === ERROR &&
                'There was a problem subscribing that address. Please check it and try again.'}
              {status === SUCCESS &&
                'Thank you for subscribing! To complete your subscription please click the confirmation link in the email we just sent you.'}
            </p>
          </form>
        </div>
        <style jsx>{`
          .root {
            margin: 0 auto ${CONTENT_ITEM_SPACING};
          }

          label {
            display: block;
            font-size: ${fonts.f15};
            letter-spacing: ${letterSpacing.regular};
            margin-bottom: ${spacing.s1};
          }

          .fields {
            display: flex;
          }

          input,
          button {
            background: none;
            border: 1px solid ${colors.black};
            height: ${spacing.s2};
            font-size: ${fonts.f15};
            letter-spacing: ${letterSpacing.tight};
          }

          input {
            flex-grow: 1;
            max-width: 20rem;
            font-weight: ${weights.light};
            padding-left: ${spacing.s05};
          }

          button {
            text-transform: uppercase;
            font-weight: ${weights.bold};
            padding: 0 ${spacing.s1};
            margin-left: ${spacing.s2};
            letter-spacing: ${letterSpacing.regular};
          }

          .message {
            font-size: ${fonts.f15};
            line-height: ${lineHeights.copy};
          }
        `}</style>
      </Container>
    );
  }
}

export default SubscribeForm;
