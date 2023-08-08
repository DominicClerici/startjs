import Image from "next/image"
import styles from "./Shortcuts.module.css"
import tick from "../../../images/tick.png"
import trash from "../../../images/trash.png"
import check from "../../../images/check.png"
import close from "../../../images/close_small.png"
import editImg from "../../../images/edit.png"
import create from "../../../images/create.png"
import globe from "../../../images/globe.png"
import { useEffect, useRef, useState } from "react"

const Shortcut = ({ name, url, i, set, del }) => {
  const edit = useRef(null)
  const [isEditing, setIsEditing] = useState(false)
  let newName = name
  let newUrl = url
  return (
    <>
      {isEditing ? (
        <div ref={edit} className={styles.editing}>
          <div>
            <div className={styles.cat}>
              <a>Name</a>
              <input
                defaultValue={name}
                onChange={(e) => {
                  newName = e.target.value
                }}
              ></input>
            </div>
            <div className={styles.cat}>
              <a>URL</a>
              <input
                defaultValue={url}
                placeholder="https://..."
                onChange={(e) => {
                  newUrl = e.target.value
                }}
              ></input>
            </div>
          </div>
          <Image
            className={styles.dontSave}
            src={close}
            onClick={() => {
              setIsEditing(false)
            }}
            width="20"
            height="20"
            alt="Discard changes"
          ></Image>
          <button
            onClick={() => {
              // ! save here ----------
              set({ name: newName, url: newUrl })
              setIsEditing(false)
            }}
            className={`button ${styles.save}`}
          >
            Save
          </button>
        </div>
      ) : (
        <div className={styles.indivShortcut}>
          <div
            className={styles.editCont}
            onClick={() => setIsEditing(!isEditing)}
          >
            <Image
              className={`${styles.favicon} ${
                url === "https://example.com" && styles.empy
              }`}
              src={
                url === "https://example.com"
                  ? globe
                  : `https://s2.googleusercontent.com/s2/favicons?domain=${url}&sz=32`
              }
              width="20"
              height="20"
              alt="shortcut favicon"
            ></Image>
            <Image
              src={editImg}
              width={20}
              height={20}
              alt="edit shortcut"
              className="icon"
            ></Image>
            <a>{name}</a>
          </div>

          <Image
            onClick={() => {
              del()
            }}
            className={styles.delete}
            src={close}
            width={20}
            height={20}
            alt="delete shortcut"
          ></Image>
        </div>
      )}
    </>
  )
}

const ShortcutCol = ({ data, set, ind, delf }) => {
  const del = useRef(null)
  const titleRef = useRef(null)
  const [isOpen, setIsOpen] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [confirmDelete, setConfirmDelete] = useState(false)

  const handleDelete = () => {
    if (confirmDelete) {
    } else {
      setConfirmDelete(true)
    }
  }

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (del.current && !del.current.contains(e.target)) {
        setConfirmDelete(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [del])

  return (
    <div className={styles.shortcutColCont}>
      <div
        className={`${styles.shortcutColTitleCont} ${isOpen && styles.open}`}
      >
        <Image
          className={styles.tick}
          src={tick}
          height="24"
          width="24"
          alt="Menu toggle"
          onClick={() => setIsOpen(!isOpen)}
        ></Image>
        {isEditing ? (
          <input
            ref={titleRef}
            className={styles.titleInput}
            defaultValue={data.title}
            placeholder="Group title"
          ></input>
        ) : (
          <a onClick={() => setIsOpen(!isOpen)}>{data.title}</a>
        )}
        <Image
          onClick={() => {
            if (isEditing) {
              set({
                ...data,
                title: titleRef.current.value,
              })
            }
            setIsEditing(!isEditing)
          }}
          className={`icon ${styles.titleEditImage}`}
          src={isEditing ? check : editImg}
          height={24}
          width={24}
          alt="Edit title"
        ></Image>
        <button
          ref={del}
          onClick={handleDelete}
          className={`button ${styles.button} ${
            confirmDelete && styles.confirm
          }`}
        >
          {confirmDelete ? (
            <Image
              src={check}
              height="28"
              width="28"
              alt="Confirm delete."
              onClick={() => {
                delf()
              }}
            ></Image>
          ) : (
            <Image src={trash} height="28" width="28" alt="Delete."></Image>
          )}
        </button>
      </div>
      <div className={`${styles.shortcutList} ${isOpen && styles.open}`}>
        {data.items.map((e, i) => {
          return (
            <Shortcut
              set={(obj) => {
                set({
                  ...data,
                  items: Object.assign([], data.items, { [i]: obj }),
                })
              }}
              i={i}
              del={() => {
                let copy = [...data.items]
                copy.splice(i, 1)
                set({
                  ...data,
                  items: copy,
                })
              }}
              key={"shci" + i}
              name={e.name}
              url={e.url}
            ></Shortcut>
          )
        })}
        {data.items.length < 8 && (
          <AddNewShortcut
            add={() => {
              let copy = data.items
              copy.push({ name: "New shortcut", url: "https://example.com" })
              set({
                ...data,
                items: copy,
              })
            }}
            i={data.items.length}
          ></AddNewShortcut>
        )}
      </div>
    </div>
  )
}

const AddNewColumn = ({ i, add }) => {
  return (
    <div className={`${styles.addNew}`} onClick={add}>
      <Image
        src={create}
        height={24}
        width={24}
        alt="create new column"
        className="icon"
      ></Image>
      New group
    </div>
  )
}

const AddNewShortcut = ({ i, add }) => {
  return (
    <div className={`${styles.addNew} ${styles.short}`} onClick={add}>
      <Image
        src={create}
        height={20}
        width={20}
        alt="create new shortcut"
        className="icon"
      ></Image>
      New shortcut
    </div>
  )
}

const Shortcuts = ({ data, set }) => {
  return (
    <div className={styles.container}>
      {data.map((e, i) => {
        return (
          <ShortcutCol
            set={(obj) => {
              set((prev) => Object.assign([], prev, { [i]: obj }))
            }}
            delf={() => {
              set((prev) => {
                let copy = [...prev]
                copy.splice(i, 1)
                return copy
              })
            }}
            ind={i}
            key={"shc" + i}
            data={e}
          ></ShortcutCol>
        )
      })}
      {data.length < 4 && (
        <AddNewColumn
          add={() => {
            set((prev) => {
              let copy = [...prev]
              copy.push({
                color: "red",
                items: [],
                title: "New category",
              })
              return copy
            })
          }}
          i={data.length}
        ></AddNewColumn>
      )}
    </div>
  )
}

export default Shortcuts
