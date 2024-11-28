import { useEffect, useState } from "react"
import "./style.css"
import { List, ListItem } from "~List";

function IndexSidePanel() {
    const [data, setData] = useState([])

    useEffect(() => {
        // initiate communication with background script
        chrome.runtime.sendMessage({
            message: JSON.stringify({ type: "sidepanel" })
        }).then((response) => {
            setData(response);
        });
    }, []);

    const dispatchScrollToMessage = (messageId) => {
        // initiate communication with background script
        chrome.runtime.sendMessage({
            message: JSON.stringify({ type: "scrollToMessage", messageId })
        }).then((response) => {
            setData(response);
        });
    };

    return (
        <>
            <div className="p-4">
                <h3 className="font-semibold">Count: {data.length}</h3>
            </div>
            <List>
                {data.map((item, id) => (
                    <ListItem key={item.messageId} copyText={item.title} onClick={() => dispatchScrollToMessage(item.messageId)}>
                        <p className="text-muted-foreground">{item.title}</p>
                    </ListItem>
                ))}
            </List>
        </>
    )
}

export default IndexSidePanel