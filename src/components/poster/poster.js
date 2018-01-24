import React from 'react'
import '__Source/components/poster/poster.less';
import bg from '__Source/components/poster/images/bg.png';
import submit from '__Source/components/poster/images/submit.png';
import left from '__Source/components/intro/images/left.png';
import right from '__Source/components/intro/images/right.png';

export default class PosterContent extends React.Component {

  submitForm = () => {
    console.log(this);
    if(!this.username.value || !this.cellphone.value){
      return;
    }
    fetch('/v1/prize/user-info', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        address: this.address.value,
        name: this.username.value,
        cellphone: this.cellphone.value,
        token: localStorage.getItem('AZUL2018L.token')
      })
    }).then(()=>{
      this.props.callback &&  this.props.callback();
    });
  }
  render() {
    return <div className="poster-content">
      <div className="layer"></div>
      <div className="form-content">
        <div>
          <div>
            <img className="bg" src={bg} alt=""/>
            <img className="submit" src={submit} onClick={this.submitForm} alt=""/>
            <img className="arrow-left" src={right} alt=""/>
            <img className="arrow-right" src={left} alt=""/>
            <table>
              <tbody>
                <tr><td>姓<span>姓名</span>名:</td><td>
                  <input type="text" placeholder="请输入姓名（必填）" ref={(u) => { this.username = u; }} maxLength="50"/>
                </td></tr>
                <tr><td>手机号码:</td><td><input type="tel" ref={(c) => { this.cellphone = c; }} maxLength="11" placeholder="请输入联系方式（必填）"/></td></tr>
                <tr><td>地<span>地址</span>址:</td><td>
                  <input ref={(a) => { this.address = a; }} type="text" placeholder="请输入通讯地址" maxLength="100"/></td></tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>;
  }
}
