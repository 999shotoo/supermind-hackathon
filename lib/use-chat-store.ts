import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface Message {
    id: string
    content: string
    role: "user" | "assistant"
}

interface Chat {
    id: string
    title: string
    messages: Message[]
    createdAt: Date
}

interface ChatStore {
    chats: Chat[]
    currentChatId: string | null
    createNewChat: () => void
    saveMessage: (message: Message) => void
    deleteChat: (id: string) => void
    setCurrentChat: (id: string) => void
    getCurrentChat: () => Chat | undefined
}

export const useChatStore = create<ChatStore>()(
    persist(
        (set, get) => ({
            chats: [],
            currentChatId: null,
            createNewChat: () => {
                const newChat: Chat = {
                    id: Date.now().toString(),
                    title: "New Chat",
                    messages: [],
                    createdAt: new Date(),
                }
                set((state) => ({
                    chats: [newChat, ...state.chats],
                    currentChatId: newChat.id,
                }))
            },
            saveMessage: (message: Message) => {
                set((state) => ({
                    chats: state.chats.map((chat) =>
                        chat.id === state.currentChatId
                            ? {
                                ...chat,
                                messages: [...chat.messages, message],
                                title:
                                    chat.messages.length === 0 && message.role === "user"
                                        ? message.content.slice(0, 30)
                                        : chat.title,
                            }
                            : chat
                    ),
                }))
            },
            deleteChat: (id: string) => {
                set((state) => ({
                    chats: state.chats.filter((chat) => chat.id !== id),
                    currentChatId:
                        state.currentChatId === id
                            ? state.chats[0]?.id ?? null
                            : state.currentChatId,
                }))
            },
            setCurrentChat: (id: string) => {
                set({ currentChatId: id })
            },
            getCurrentChat: () => {
                const { chats, currentChatId } = get()
                return chats.find((chat) => chat.id === currentChatId)
            },
        }),
        {
            name: 'chat-store',
        }
    )
)

