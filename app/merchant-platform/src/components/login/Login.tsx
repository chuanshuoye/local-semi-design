import { Form, Checkbox, Button } from '@douyinfe/semi-ui';
import styles from './index.module.scss';

const Login = () => {
  return (
    <div className={styles.frame}>
      <div className={styles.main}>
        <div className={styles.login}>
          <div className={styles.component66}>
            <img
              src="https://lf6-static.semi.design/obj/semi-tos/template/99042ce4-7934-4188-b15a-90ea03b3f63d.svg"
              className={styles.logo}
            />
            <div className={styles.header}>
              <p className={styles.title}>欢迎回来</p>
              <p className={styles.text}>
                <span className={styles.text2}>登录</span>
                <span className={styles.text3}> Semi Design </span>
                <span className={styles.text2}>账户</span>
              </p>
            </div>
          </div>
          <div className={styles.form}>
            <Form className={styles.inputs}>
              <Form.Input
                label={{ text: "用户名" }}
                field="input"
                placeholder="输入用户名"
                fieldStyle={{ padding: 0 }}
                style={{ width: 440 }}
                className={styles.formField}
              />
              <Form.Input
                label={{ text: "密码" }}
                field="field1"
                placeholder="输入密码"
                fieldStyle={{ padding: 0 }}
                style={{ width: 440 }}
                className={styles.formField}
              />
            </Form>
            <Checkbox type="default" className={styles.checkbox}>
              记住我
            </Checkbox>
            <Button theme="solid" className={styles.button}>
              登录
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login;
