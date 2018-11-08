import React, { Component } from 'react';
import { Card, Button } from 'antd';
import { connect } from 'dva';

const namespace = 'puzzlecards';

/**
 * mapStateToProps 这个函数的入参 state 其实是 dva 中所有 state 的总合。
 * 对于初学 js 的人可能会很疑惑：这个入参是谁给传入的呢？其实你不用关心，
 * 你只需知道 dva 框架会适时调用 mapStateToProps，并传入 dva model state 作为入参，
 * 我们再次提醒：传入的 state 是个 "完全体"，包含了 所有 namespace 下的 state！
 * 我们自己定义的 dva model state 就是以 namespace 为 key 的 state 成员。
 * 所以 const namespace = 'puzzlecards' 中的 puzzlecards 必须和 model 中的定义完全一致。
 * dva 期待 mapStateToProps 函数返回一个 对象，这个对象会被 dva 并入到 props 中，
 * 在上面的例子中我们取到数据后，把它改名为 cardList 并返回
 * （ 注意返回的不是 cardList 本身，而是一个包含了 cardList 的对象！ ），
 * cardList 就可以在子组件中通过 props 被访问到了。
 * @param state
 * @returns {{cardList: *}}
 */
const mapStateToProps = (state) => {
    const cardList = state[namespace].data;
    return {
        cardList,
    };
};

/**
 * connect 传入了第二个函数：mapDispatchToProps，该函数以 dispatch 为入参，返回一个挂着函数的对象，
 *      这个对象上的函数会被 dva 并入 props，注入给组件使用。
 * @param dispatch
 * @returns {{onClickAdd: function(*=)}}
 */
const mapDispatchToProps = (dispatch) => {
    return {
        onClickAdd: (newCard) => {
            const action = {
                type: `${namespace}/addNewCard`,
                payload: newCard,
            };
            dispatch(action);
        },
        onDidMount: () => {
            dispatch({
                type: `${namespace}/queryInitCards`,
            });
        },
    };
};

/**
 * connect 让组件获取到两样东西：1.model中的数据；2.驱动model改变的方法；
 * connect 本质上只是一个 javascript 函数，通过 @ 装饰器语法使用，放置在组件定义的上方；
 * connect 既然是函数，就可以接受入参，第一个入参是最常用的，它需要是一个函数，我们习惯给它命名叫
 *          mapStateToProps，顾名思义就是把 dva model 中的state通过组件的 props 注入给组件。
 *          通过实现这个函数，我们就能实现把 dva model 的state注入给组件。
 */
@connect(mapStateToProps, mapDispatchToProps)
export default class PuzzleCardsPage extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.onDidMount();
    }

    render() {
        return (
            <div>
                {
                    this.props.cardList.map(card => {
                        return (
                            <Card key={card.id}>
                                <div>Q: {card.setup}</div>
                                <div>
                                    <strong>A: {card.punchline}</strong>
                                </div>
                            </Card>
                        );
                    })
                }
                <div>
                    <Button onClick={() => this.props.onClickAdd({
                        setup: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
                        punchline: 'here we use dva',
                    })}> 添加卡片 </Button>
                </div>
            </div>
        );
    }
}
