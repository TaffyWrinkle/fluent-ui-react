import * as React from 'react'
import * as PropTypes from 'prop-types'
import * as cx from 'classnames'

import { childrenExist, createShorthandFactory, customPropTypes, UIComponent } from '../../lib'
import { ComponentVariablesInput, IComponentPartStylesInput } from '../../../types/theme'
import { Extendable, ReactChildren, ItemShorthand } from '../../../types/utils'
import Avatar from '../Avatar'
import ChatMessageBehavior from '../../lib/accessibility/Behaviors/Chat/ChatMessageBehavior'
import { Accessibility, AccessibilityActionHandlers } from '../../lib/accessibility/interfaces'

export interface IChatMessageProps {
  as?: any
  avatar?: ItemShorthand
  children?: ReactChildren
  className?: string
  content?: any
  mine?: boolean
  styles?: IComponentPartStylesInput
  variables?: ComponentVariablesInput
}

class ChatMessage extends UIComponent<Extendable<IChatMessageProps>, any> {
  static className = 'ui-chat__message'

  static create: Function

  static displayName = 'ChatMessage'

  static propTypes = {
    /** Accessibility behavior if overridden by the user. */
    accessibility: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),

    as: customPropTypes.as,

    /** Chat messages can have an avatar */
    avatar: customPropTypes.itemShorthand,

    /** Child content. */
    children: PropTypes.node,

    /** Additional classes. */
    className: PropTypes.string,

    /** Shorthand for the primary content. */
    content: PropTypes.any,

    /** Indicates whether message belongs to the current user. */
    mine: PropTypes.bool,

    /** Custom styles to be applied for component. */
    styles: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),

    /** Custom variables to be applied for component. */
    variables: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
  }

  static handledProps = [
    'accessibility',
    'as',
    'avatar',
    'children',
    'className',
    'content',
    'mine',
    'styles',
    'variables',
  ]

  static defaultProps = {
    accessibility: ChatMessageBehavior as Accessibility,
    as: 'li',
  }

  renderComponent({ ElementType, classes, accessibility, rest, styles, variables }) {
    const { avatar, children, content, mine } = this.props

    return childrenExist(children) ? (
      <ElementType
        {...accessibility.attributes.root}
        {...accessibility.keyHandlers.root}
        {...rest}
        className={cx(classes.root, classes.content)}
      >
        {children}
      </ElementType>
    ) : (
      <ElementType
        {...accessibility.attributes.root}
        {...accessibility.keyHandlers.root}
        {...rest}
        className={classes.root}
      >
        {!mine && this.renderAvatar(avatar, styles, variables)}
        <div className={classes.content}>{content}</div>
        {mine && this.renderAvatar(avatar, styles, variables)}
      </ElementType>
    )
  }

  private renderAvatar = (
    avatar: ItemShorthand,
    styles: IComponentPartStylesInput,
    variables: ComponentVariablesInput,
  ) =>
    avatar &&
    Avatar.create(avatar, {
      defaultProps: {
        styles: { root: styles.avatar },
        variables: variables.avatar,
      },
    })
}

ChatMessage.create = createShorthandFactory(ChatMessage, content => ({ content }))

export default ChatMessage
