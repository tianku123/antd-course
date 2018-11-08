import React from 'react';
import { Table, Modal, Button, Form, Input } from 'antd';
import { connect } from 'dva';

const FormItem = Form.Item;

const columns = [
    {
        title: '名称',
        dataIndex: 'name',
    },
    {
        title: '描述',
        dataIndex: 'desc',
    },
    {
        title: '链接',
        dataIndex: 'url',
    },
];

class List extends React.Component {
    state = {
        visible: false,
    };

    componentDidMount() {
        this.props.dispatch({
            type: 'cards/queryList',
        });
    }

    showModal = () => {
        this.setState({ visible: !this.state.visible });
    };

    handleOk = () => {
        const {dispatch, form: {validateFields}} = this.props;

        validateFields((err, values) => {
            if (!err) {
                dispatch({
                    type: 'cards/addOne',
                    payload: values,
                });
                // 重置 `visible` 属性为 false 以关闭对话框
                this.setState({visible: false});
            }
        });
    }

    render() {
        const { cardsList, cardsLoading } = this.props;

        const { form: { getFieldDecorator } } = this.props;

        return (
            <div>
                <Button onClick={this.showModal}>新建</Button>
                <Modal title="新建记录" visible={ this.state.visible } onCancel={ this.showModal }
                    onOk={ this.handleOk }
                >
                    <Form>
                        <FormItem label="名称">
                            {getFieldDecorator('name', {
                                rules: [{ required: true }],
                            })(
                                <Input />
                            )}
                        </FormItem>
                        <FormItem label="描述">
                            {getFieldDecorator('desc')(
                                <Input />
                            )}
                        </FormItem>
                        <FormItem label="链接">
                            {getFieldDecorator('url', {
                                rules: [{ type: 'url' }],
                            })(
                                <Input />
                            )}
                        </FormItem>
                    </Form>
                </Modal>
                <Table columns={columns} dataSource={cardsList} loading={cardsLoading} rowKey="id" />
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        cardsList: state.cards.cardsList,
        /**
         * 当用户 dispatch 对应 effect 时，dva 会自动注入对应 effect 的 loading 状态。
         * 因而我们可以很方便的将 state.loading.effects 中的状态传入
         */
        cardsLoading: state.loading.effects['cards/queryList'],
    };
}

/**
 * Form.create()(List)
 * 这段代码的作用是创建一个高阶组件，为页面组件 List 提供表单所需要的内容(this.props.form)。
 */
export default connect(mapStateToProps)(Form.create()(List));
