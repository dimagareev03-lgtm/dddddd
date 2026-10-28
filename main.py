"""Простой стартовый скрипт."""


def greet(name: str = "мир") -> str:
    return f"Привет, {name}!"


if __name__ == "__main__":
    print(greet())
