import React, { Component } from 'react'
import { Link, graphql, StaticQuery } from 'gatsby'
import Button from 'antd/lib/button'
import { connect } from 'react-redux'
import { onChangeMenuState } from '../../actions/layout'
import { onSetSidebarOpen } from '../../actions/layout'
import List from 'antd/lib/list'
import { getMenuState } from '../../store/selectors'
import { Menu as AntMenu } from 'antd'
import { CloseOutlined } from '@ant-design/icons'

class Menu extends Component {
  onChangeMenuState = nItem => {
    this.props.onChangeMenuState(nItem)
  }

  onSetSidebarClose = () => {
    this.props.onSetSidebarOpen(false)
  }

  render() {
    const { sidebarDocked, menuOpen, isBlogPage, sidebarHide } = this.props
    return (
      <StaticQuery
        query={graphql`
          query {
            allMenuItemsJson {
              edges {
                node {
                  name
                  link
                  a
                }
              }
            }
          }
        `}
        render={data => {
          const menuItems = data.allMenuItemsJson.edges.map(edge => edge.node)
          return (
            <div className="headerItems" style={{ marginRight: 20 }}>
              {sidebarDocked && (
                <AntMenu
                  mode="horizontal"
                  style={{
                    borderBottomWidth: 0,
                  }}
                >
                  {menuItems.reverse().map(item => {
                    return (
                      <AntMenu.Item
                        className="headerKey"
                        style={{
                          marginLeft: '2em',
                          float: 'right',
                          marginBottom: 'calc(1.45rem / 2)'
                        }}
                        key={item.link || item.a}
                      >
                        {item.a ? (
                          <a href={item.a} style={{ color: isBlogPage ? '#FFFFFF' : '#595959' }}>
                            {item.name}
                          </a>
                        ) : (
                          <Link to={item.link} style={{ color: isBlogPage ? '#FFFFFF' : '#595959'}}>
                            {item.name}
                          </Link>
                        )}
                      </AntMenu.Item>
                    )
                  })}
                </AntMenu>
              )}
              {!sidebarDocked && !menuOpen ? (
                <Button
                  style={{
                    color: '#1D4AFF',
                    
                  }}
                  type="link"
                  onClick={() => {
                    this.onChangeMenuState(menuItems.length)
                  }}
                  icon="menu"
                />
              ):(
                <div>
                <CloseOutlined 
                className="closeButton"
                  style={{ 
                    float: 'right',
                    margin: '16px 20px',
                    fontSize: '30px', 
                  }}
                  onClick={() => {
                    this.onChangeMenuState(menuItems.length)
                  }}
                ></CloseOutlined>
              </div>
              )}
              {menuOpen && !sidebarDocked && (
                <div
                  style={{
                    position: 'relative',
                    marginTop: '64px',
                    left: 0,
                    height: '100vw',
                    width: '100vw',
                    paddingLeft: 0,
                    paddingRight: 0,
                    backgroudColor: 'red'
                  }}
                >
                  <div style={{height: '100px'}}/>
                  <List
                    itemLayout="horizontal"
                    dataSource={menuItems}
                    rowKey={item => item.a || item.link}
                    renderItem={item => (
                      <List.Item
                        style={{
                          listStyle: 'none',
                          padding: '3vh 10vw',
                          margin: 0
                        }}
                        key={menuItems.indexOf(item)}
                      >
                        {item.a ? (
                          <List.Item.Meta
                            title={
                              <a
                                href={item.a}
                                style={{
                                  color: 'black',
                                  textDecoration: 'none',
                                }}
                                onClick={() => {
                                  this.onChangeMenuState(menuItems.length)
                                }}
                              >
                                {item.name}
                              </a>
                            }
                          />
                        ) : (
                          <List.Item.Meta
                            title={
                              <Link
                                to={item.link}
                                style={{
                                  color: 'black',
                                  textDecoration: 'none',
                                }}
                                onClick={() => {
                                  this.onChangeMenuState(menuItems.length)
                                }}
                              >
                                {item.name}
                              </Link>
                            }
                          />
                        )}
                      </List.Item>
                    )}
                    style={{
                      width: '100%',
                      float: 'left',
                      backgroundColor: '#F0F0F0'
                    }}
                  />
                </div>
              )}
            </div>
          )
        }}
      />
    )
  }
}

const mapStateToProps = state => {
  return {
    menuOpen: getMenuState(state).open,
  }
}

const mapDispatchToProps = {
  onChangeMenuState,
}

// export default Menu
export default connect(mapStateToProps, mapDispatchToProps)(Menu)
