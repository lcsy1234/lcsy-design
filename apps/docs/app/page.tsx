import Image, { type ImageProps } from "next/image";
import { Button, Select, Tabs, Menu, Modal } from "lcsy-design";
import styles from "./page.module.css";

type Props = Omit<ImageProps, "src"> & {
  srcLight: string;
  srcDark: string;
};

const ThemeImage = (props: Props) => {
  const { srcLight, srcDark, ...rest } = props;

  return (
    <>
      <Image {...rest} src={srcLight} className="imgLight" />
      <Image {...rest} src={srcDark} className="imgDark" />
    </>
  );
};

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <h2>组件演示</h2>
        <section>
          <h3>Select</h3>
          <Select
            options={[
              { label: "选项1", value: "1" },
              { label: "选项2", value: "2" },
              { label: "选项3", value: "3", disabled: true },
            ]}
            defaultValue="1"
            onChange={(v)=>console.log("Select:", v)}
          />
        </section>
        <section>
          <h3>Tabs</h3>
          <Tabs
            defaultActiveKey={"tab1"}
            items={[
              { key: "tab1", label: "标签一", children: <div>内容一</div> },
              { key: "tab2", label: "标签二", children: <div>内容二</div> },
              { key: "tab3", label: "禁用", children: <div>内容三</div>, disabled: true },
            ]}
            onChange={(k)=>console.log("Tabs:", k)}
          />
        </section>
        <section>
          <h3>Menu</h3>
          <Menu
            menuData={[
              { key: "nav1", label: "导航一", children: [
                { key: "opt1", label: "选项1", defaultActive: true },
                { key: "opt2", label: "选项2" },
              ]},
              { key: "nav2", label: "导航二" },
            ]}
          />
        </section>
        <section>
          <h3>Modal</h3>
          <Modal open={false} title={"示例弹窗"}>
            这是弹窗内容
          </Modal>
        </section>
      </main>
    </div>
  );
}
